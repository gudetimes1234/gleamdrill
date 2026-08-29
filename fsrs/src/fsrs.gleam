//// FSRS-6, the spaced repetition scheduler Anki schedules with by default.
////
//// A faithful port of the reference implementation, `py-fsrs`
//// (github.com/open-spaced-repetition/py-fsrs, `fsrs/scheduler.py`). The
//// conformance vectors in `test/vectors.gleam` are generated from that
//// package, so drift from upstream shows up as a failing test rather than as
//// quietly wrong review dates.
////
//// This module is deliberately target-agnostic: no FFI, no I/O, no clock and
//// no randomness. The server schedules with it on the Erlang target and the
//// browser previews intervals with it on the JavaScript target, from this one
//// source file. `review` takes `now` and the fuzz sample as arguments instead
//// of reaching for a clock or a RNG, which is what keeps it pure -- and what
//// makes exact conformance testing possible.

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/time/duration.{type Duration}
import gleam/time/timestamp.{type Timestamp}

/// The FSRS-6 default weights, as shipped by py-fsrs.
///
/// There are 21 of them because FSRS-6 promoted the forgetting curve's decay
/// to a learnable parameter (`w20`); FSRS-5 had 19 and hardcoded it. Older
/// write-ups quoting `DECAY = -0.5, FACTOR = 19/81` describe FSRS-4.5 and do
/// not apply here.
pub const default_parameters: List(Float) = [
  0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001, 1.8722, 0.1666,
  0.796, 1.4835, 0.0614, 0.2629, 1.6483, 0.6014, 1.8729, 0.5425, 0.0912, 0.0658,
  0.1542,
]

const stability_min = 0.001

const min_difficulty = 1.0

const max_difficulty = 10.0

const seconds_per_day = 86_400

/// How well the card was recalled. The integer values matter: the formulas
/// use the rating as a number, and the database stores it as one.
pub type Rating {
  Again
  Hard
  Good
  Easy
}

pub fn rating_to_int(rating: Rating) -> Int {
  case rating {
    Again -> 1
    Hard -> 2
    Good -> 3
    Easy -> 4
  }
}

pub fn rating_from_int(value: Int) -> Result(Rating, Nil) {
  case value {
    1 -> Ok(Again)
    2 -> Ok(Hard)
    3 -> Ok(Good)
    4 -> Ok(Easy)
    _ -> Error(Nil)
  }
}

/// Where a card sits in the learning pipeline.
///
/// `Learning` and `Relearning` carry their index into the configured step
/// list. `Review` carries no step, mirroring the reference implementation's
/// `step = None` and making "a review card with a step" unrepresentable.
pub type State {
  Learning(step: Int)
  Review
  Relearning(step: Int)
}

/// A card's memory state.
///
/// `None` on a card that has never been reviewed: stability and difficulty are
/// only defined once there is a first rating to derive them from.
pub type Memory {
  Memory(stability: Float, difficulty: Float)
}

pub type Card {
  Card(
    state: State,
    memory: Option(Memory),
    due: Timestamp,
    last_review: Option(Timestamp),
  )
}

/// A card that has never been seen. Due immediately, so it lands in the queue
/// the moment it is introduced.
pub fn new_card(now: Timestamp) -> Card {
  Card(state: Learning(0), memory: None, due: now, last_review: None)
}

pub type Config {
  Config(
    /// Exactly 21 weights. A list of any other length falls back to the
    /// defaults rather than crashing a review.
    parameters: List(Float),
    /// Probability of recall to schedule for, e.g. 0.9. Lower means longer
    /// intervals and more forgetting.
    desired_retention: Float,
    /// Minutes.
    learning_steps: List(Int),
    /// Minutes.
    relearning_steps: List(Int),
    /// Days.
    maximum_interval: Int,
    enable_fuzz: Bool,
  )
}

pub fn default_config() -> Config {
  Config(
    parameters: default_parameters,
    desired_retention: 0.9,
    learning_steps: [1, 10],
    relearning_steps: [10],
    maximum_interval: 36_500,
    enable_fuzz: True,
  )
}

// --- weights ---------------------------------------------------------------

/// The parameter list unpacked into named fields, so the formulas below can be
/// read against the published spec line by line instead of indexing a list.
type W {
  W(
    w0: Float,
    w1: Float,
    w2: Float,
    w3: Float,
    w4: Float,
    w5: Float,
    w6: Float,
    w7: Float,
    w8: Float,
    w9: Float,
    w10: Float,
    w11: Float,
    w12: Float,
    w13: Float,
    w14: Float,
    w15: Float,
    w16: Float,
    w17: Float,
    w18: Float,
    w19: Float,
    w20: Float,
  )
}

fn weights(parameters: List(Float)) -> W {
  case parameters {
    [
      w0,
      w1,
      w2,
      w3,
      w4,
      w5,
      w6,
      w7,
      w8,
      w9,
      w10,
      w11,
      w12,
      w13,
      w14,
      w15,
      w16,
      w17,
      w18,
      w19,
      w20,
    ] ->
      W(
        w0,
        w1,
        w2,
        w3,
        w4,
        w5,
        w6,
        w7,
        w8,
        w9,
        w10,
        w11,
        w12,
        w13,
        w14,
        w15,
        w16,
        w17,
        w18,
        w19,
        w20,
      )
    // A wrong-length parameter list can only come from corrupt storage or a
    // half-finished optimizer run. Scheduling with the defaults is better than
    // refusing to schedule at all.
    _ -> weights(default_parameters)
  }
}

// --- numeric helpers -------------------------------------------------------

/// `float.power` fails only for a negative base with a fractional exponent.
/// Every base below is clamped positive -- stability >= 0.001, difficulty
/// >= 1.0, retention in (0, 1) -- so the error case is unreachable. Unwrapping
/// here keeps the formulas readable instead of threading `Result` through all
/// of them.
fn pow(base: Float, exponent: Float) -> Float {
  float.power(base, exponent) |> result.unwrap(0.0)
}

/// Round half to even, matching Python's `round` -- which is what the
/// reference implementation uses everywhere it turns a float into a number of
/// days.
///
/// This is not a theoretical nicety. The fuzz sampler computes
/// `sample * span + min`, so a caller passing 0.5 lands on an exact half every
/// time; half-up rounding there disagrees with upstream by a whole day.
/// Doing it by hand also sidesteps `float.round`, which delegates to the host
/// (`erlang:round` vs `Math.round`) and so would differ between our two
/// targets.
fn round_half_even(x: Float) -> Int {
  let below = float.truncate(float.floor(x))
  let fraction = x -. int.to_float(below)
  case fraction <. 0.5, fraction >. 0.5 {
    True, _ -> below
    _, True -> below + 1
    // Exactly halfway: pick the even neighbour.
    _, _ ->
      case below % 2 == 0 {
        True -> below
        False -> below + 1
      }
  }
}

fn decay(w: W) -> Float {
  0.0 -. w.w20
}

fn curve_factor(w: W) -> Float {
  pow(0.9, 1.0 /. decay(w)) -. 1.0
}

/// Whole days between two instants, flooring toward negative infinity.
///
/// This matches Python's `timedelta.days`, which the reference implementation
/// compares against 1 to choose the same-day path. Truncating toward zero
/// instead would put some reviews on the wrong branch.
fn elapsed_days(from: Timestamp, to: Timestamp) -> Int {
  let #(seconds, _) =
    duration.to_seconds_and_nanoseconds(timestamp.difference(from, to))
  int.floor_divide(seconds, seconds_per_day) |> result.unwrap(0)
}

fn clamp_stability(stability: Float) -> Float {
  float.max(stability, stability_min)
}

fn clamp_difficulty(difficulty: Float) -> Float {
  float.clamp(difficulty, min_difficulty, max_difficulty)
}

// --- the model ------------------------------------------------------------

/// Predicted probability of recalling the card right now, in [0, 1].
///
/// Note the elapsed time is measured in **whole** days, not fractions: that is
/// what the reference implementation does, and using fractional days here
/// would slowly drift away from Anki's numbers.
pub fn retrievability(card: Card, now: Timestamp, config: Config) -> Float {
  case card.memory, card.last_review {
    Some(memory), Some(last) ->
      retrievability_after(config, memory.stability, elapsed_days(last, now))
    _, _ -> 0.0
  }
}

/// Retrievability of a given stability after a whole number of days. Split out
/// from `retrievability` so the stats forecast can project a card forward
/// without inventing a `Card` to do it.
pub fn retrievability_after(
  config: Config,
  stability: Float,
  elapsed_days: Int,
) -> Float {
  let w = weights(config.parameters)
  let days = elapsed_days |> int.max(0) |> int.to_float
  pow(1.0 +. curve_factor(w) *. days /. stability, decay(w))
}

fn initial_stability(w: W, rating: Rating) -> Float {
  clamp_stability(case rating {
    Again -> w.w0
    Hard -> w.w1
    Good -> w.w2
    Easy -> w.w3
  })
}

fn initial_difficulty_raw(w: W, rating: Rating) -> Float {
  let g = int.to_float(rating_to_int(rating))
  w.w4 -. float.exponential(w.w5 *. { g -. 1.0 }) +. 1.0
}

fn initial_difficulty(w: W, rating: Rating) -> Float {
  clamp_difficulty(initial_difficulty_raw(w, rating))
}

/// The memory state a brand new card gets from its very first rating.
pub fn initial_memory(config: Config, rating: Rating) -> Memory {
  let w = weights(config.parameters)
  Memory(initial_stability(w, rating), initial_difficulty(w, rating))
}

pub fn next_difficulty(
  config: Config,
  difficulty: Float,
  rating: Rating,
) -> Float {
  let w = weights(config.parameters)
  let g = int.to_float(rating_to_int(rating))
  let delta = 0.0 -. { w.w6 *. { g -. 3.0 } }
  // Linear damping: a card already near maximum difficulty moves less than one
  // near the minimum, so difficulty saturates smoothly instead of pinning.
  let damped = difficulty +. { 10.0 -. difficulty } *. delta /. 9.0
  // Mean reversion pulls toward the difficulty a brand-new Easy card would be
  // given. This target is deliberately UNCLAMPED -- the reference passes
  // `clamp=False` here, and clamping it changes long-run difficulty.
  let target = initial_difficulty_raw(w, Easy)
  clamp_difficulty(w.w7 *. target +. { 1.0 -. w.w7 } *. damped)
}

/// Stability update for a review that happens on the same day as the last one.
/// Repeated same-day reps help, but far less than spaced ones -- which is
/// exactly why grinding a problem five times in one sitting does not earn a
/// five-month interval.
pub fn short_term_stability(
  config: Config,
  stability: Float,
  rating: Rating,
) -> Float {
  let w = weights(config.parameters)
  let g = int.to_float(rating_to_int(rating))
  let increase =
    float.exponential(w.w17 *. { g -. 3.0 +. w.w18 })
    *. pow(stability, 0.0 -. w.w19)
  // A passing grade must never shrink stability; only `Again` may.
  let increase = case rating {
    Again -> increase
    _ -> float.max(increase, 1.0)
  }
  clamp_stability(stability *. increase)
}

pub fn recall_stability(
  config: Config,
  memory: Memory,
  retrievability: Float,
  rating: Rating,
) -> Float {
  let w = weights(config.parameters)
  let hard_penalty = case rating {
    Hard -> w.w15
    _ -> 1.0
  }
  let easy_bonus = case rating {
    Easy -> w.w16
    _ -> 1.0
  }
  memory.stability
  *. {
    1.0
    +. float.exponential(w.w8)
    *. { 11.0 -. memory.difficulty }
    *. pow(memory.stability, 0.0 -. w.w9)
    *. { float.exponential({ 1.0 -. retrievability } *. w.w10) -. 1.0 }
    *. hard_penalty
    *. easy_bonus
  }
}

pub fn forget_stability(
  config: Config,
  memory: Memory,
  retrievability: Float,
) -> Float {
  let w = weights(config.parameters)
  let long_term =
    w.w11
    *. pow(memory.difficulty, 0.0 -. w.w12)
    *. { pow(memory.stability +. 1.0, w.w13) -. 1.0 }
    *. float.exponential({ 1.0 -. retrievability } *. w.w14)
  // A lapse can never leave the card more stable than a same-day failure
  // would, which is what caps the long-term term here.
  let short_term = memory.stability /. float.exponential(w.w17 *. w.w18)
  float.min(long_term, short_term)
}

pub fn next_stability(
  config: Config,
  memory: Memory,
  retrievability: Float,
  rating: Rating,
) -> Float {
  clamp_stability(case rating {
    Again -> forget_stability(config, memory, retrievability)
    _ -> recall_stability(config, memory, retrievability, rating)
  })
}

/// Days until retrievability decays to `desired_retention`.
pub fn next_interval_days(config: Config, stability: Float) -> Int {
  let w = weights(config.parameters)
  stability
  /. curve_factor(w)
  *. { pow(config.desired_retention, 1.0 /. decay(w)) -. 1.0 }
  |> round_half_even
  |> int.clamp(min: 1, max: config.maximum_interval)
}

// --- scheduling -----------------------------------------------------------

/// Record a review and return the rescheduled card.
///
/// `now` is the review instant and `fuzz` a sample in [0.0, 1.0) used to
/// scatter long intervals; both are arguments rather than ambient state so
/// this stays a pure function. `fuzz` is ignored unless `config.enable_fuzz`
/// is set and the card ends up in `Review`.
pub fn review(
  card: Card,
  rating: Rating,
  now: Timestamp,
  config: Config,
  fuzz: Float,
) -> Card {
  let same_day = case card.last_review {
    Some(last) -> elapsed_days(last, now) < 1
    None -> False
  }

  let memory = update_memory(card, rating, now, config, same_day)
  let #(state, interval) = next_schedule(config, card.state, rating, memory)
  let interval = case config.enable_fuzz, state {
    True, Review -> fuzz_interval(interval, config, fuzz)
    _, _ -> interval
  }

  Card(
    state: state,
    memory: Some(memory),
    due: timestamp.add(now, interval),
    last_review: Some(now),
  )
}

fn update_memory(
  card: Card,
  rating: Rating,
  now: Timestamp,
  config: Config,
  same_day: Bool,
) -> Memory {
  case card.memory {
    // First ever review: seed from the rating alone, there is no history to
    // update against.
    None -> initial_memory(config, rating)
    Some(memory) -> {
      let stability = case same_day {
        True -> short_term_stability(config, memory.stability, rating)
        False ->
          next_stability(
            config,
            memory,
            retrievability(card, now, config),
            rating,
          )
      }
      Memory(stability, next_difficulty(config, memory.difficulty, rating))
    }
  }
}

fn next_schedule(
  config: Config,
  state: State,
  rating: Rating,
  memory: Memory,
) -> #(State, Duration) {
  case state {
    Learning(step) ->
      step_schedule(config, config.learning_steps, step, rating, memory, fn(n) {
        Learning(n)
      })
    Relearning(step) ->
      step_schedule(
        config,
        config.relearning_steps,
        step,
        rating,
        memory,
        fn(n) { Relearning(n) },
      )
    Review ->
      case rating, config.relearning_steps {
        // A lapse with no relearning steps configured stays in Review and just
        // takes the (much shorter) interval its collapsed stability earns.
        Again, [] -> #(Review, review_interval(config, memory))
        Again, [first, ..] -> #(Relearning(0), minutes(int.to_float(first)))
        _, _ -> #(Review, review_interval(config, memory))
      }
  }
}

/// The step machine shared by `Learning` and `Relearning` -- identical logic,
/// different step list and different state constructor.
fn step_schedule(
  config: Config,
  steps: List(Int),
  step: Int,
  rating: Rating,
  memory: Memory,
  in_state: fn(Int) -> State,
) -> #(State, Duration) {
  let count = list.length(steps)
  let passed = rating != Again
  // A card can be holding a step index past the end of a step list that has
  // since been shortened. Graduating it is how the reference implementation
  // recovers, rather than clamping it back into a step it already cleared.
  case count == 0 || { step >= count && passed } {
    True -> #(Review, review_interval(config, memory))
    False ->
      case rating {
        Again -> #(in_state(0), minutes(int.to_float(minutes_at(steps, 0))))
        Hard -> #(in_state(step), hard_step_interval(steps, step))
        Good ->
          case step + 1 == count {
            // Cleared the last step: graduate.
            True -> #(Review, review_interval(config, memory))
            False -> #(
              in_state(step + 1),
              minutes(int.to_float(minutes_at(steps, step + 1))),
            )
          }
        // Easy always skips the remaining steps.
        Easy -> #(Review, review_interval(config, memory))
      }
  }
}

/// FSRS has no dedicated "Hard" step, so it synthesises one: on the first step
/// it sits halfway between step one and step two (or 1.5x when there is only
/// one step), and later it simply repeats the current step.
fn hard_step_interval(steps: List(Int), step: Int) -> Duration {
  case step, steps {
    0, [first] -> minutes(int.to_float(first) *. 1.5)
    0, [first, second, ..] -> minutes(int.to_float(first + second) /. 2.0)
    _, _ -> minutes(int.to_float(minutes_at(steps, step)))
  }
}

fn minutes_at(steps: List(Int), index: Int) -> Int {
  // Callers bounds-check `index`; one minute is a harmless floor if that ever
  // stops being true.
  steps |> list.drop(index) |> list.first |> result.unwrap(1)
}

fn minutes(count: Float) -> Duration {
  duration.seconds(round_half_even(count *. 60.0))
}

fn review_interval(config: Config, memory: Memory) -> Duration {
  duration.seconds(
    next_interval_days(config, memory.stability) * seconds_per_day,
  )
}

/// Cumulative fuzz widths: +/-15% of the interval between 2.5 and 7 days, 10%
/// between 7 and 20, 5% beyond.
const fuzz_ranges: List(#(Float, Float, Float)) = [
  #(2.5, 7.0, 0.15),
  #(7.0, 20.0, 0.1),
  #(20.0, 1.0e18, 0.05),
]

/// Scatter an interval slightly so cards first seen on the same day do not
/// stay clumped together forever. Intervals under 2.5 days are left alone.
fn fuzz_interval(
  interval: Duration,
  config: Config,
  sample: Float,
) -> Duration {
  let #(seconds, _) = duration.to_seconds_and_nanoseconds(interval)
  let days = int.floor_divide(seconds, seconds_per_day) |> result.unwrap(0)
  let days_float = int.to_float(days)
  case days_float <. 2.5 {
    True -> interval
    False -> {
      let delta =
        list.fold(fuzz_ranges, 1.0, fn(acc, range) {
          let #(start, end, factor) = range
          acc +. factor *. float.max(float.min(days_float, end) -. start, 0.0)
        })
      let max_ivl =
        round_half_even(days_float +. delta) |> int.min(config.maximum_interval)
      let min_ivl =
        round_half_even(days_float -. delta) |> int.max(2) |> int.min(max_ivl)
      let sampled =
        sample *. int.to_float(max_ivl - min_ivl + 1) +. int.to_float(min_ivl)
      let fuzzed = round_half_even(sampled) |> int.min(config.maximum_interval)
      duration.seconds(fuzzed * seconds_per_day)
    }
  }
}

// --- helpers for callers ---------------------------------------------------

/// What each of the four buttons would do, for rendering Anki-style interval
/// hints on the grading bar.
///
/// Fuzz is deliberately disabled: the preview must match what the user is
/// about to get, and fuzz is only resolved when the review is actually
/// recorded on the server.
pub fn preview(
  card: Card,
  now: Timestamp,
  config: Config,
) -> List(#(Rating, Card)) {
  let config = Config(..config, enable_fuzz: False)
  [Again, Hard, Good, Easy]
  |> list.map(fn(rating) { #(rating, review(card, rating, now, config, 0.0)) })
}

/// Seconds from `now` until the card is next due. Negative once overdue.
pub fn interval_seconds(card: Card, now: Timestamp) -> Int {
  let #(seconds, _) =
    duration.to_seconds_and_nanoseconds(timestamp.difference(now, card.due))
  seconds
}

pub fn is_due(card: Card, now: Timestamp) -> Bool {
  interval_seconds(card, now) <= 0
}

// --- wire format -----------------------------------------------------------
//
// Timestamps cross every boundary in this system -- Postgres, and the JSON
// API -- as epoch seconds. These conversions live here, in the package both
// the server and the browser already depend on, so the two ends cannot drift
// apart on how an instant is encoded.

pub fn to_epoch(moment: Timestamp) -> Float {
  timestamp.to_unix_seconds(moment)
}

pub fn from_epoch(seconds: Float) -> Timestamp {
  let whole = float.truncate(float.floor(seconds))
  let fraction = seconds -. int.to_float(whole)
  timestamp.from_unix_seconds_and_nanoseconds(
    whole,
    round_half_even(fraction *. 1_000_000_000.0),
  )
}

/// Whole days between two instants, flooring toward negative infinity.
///
/// This is the same measure the scheduler itself uses to decide the same-day
/// branch, exposed so callers logging a review report the elapsed time the
/// scheduling actually used.
pub fn days_between(from: Timestamp, to: Timestamp) -> Int {
  elapsed_days(from, to)
}
