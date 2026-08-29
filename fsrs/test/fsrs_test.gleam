//// Conformance tests for the FSRS-6 port.
////
//// Everything in `vectors.gleam` is generated from the reference `py-fsrs`
//// package, so these tests are not checking the port against my own
//// understanding of the spec -- they check it against upstream's actual
//// output. That distinction matters: the formulas are easy to transcribe in a
//// way that looks right and is subtly wrong.
////
//// Run on BOTH targets (`gleam test` and `gleam test --target javascript`).
//// Identical results are what licenses the server and the browser to schedule
//// from this one module.

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{Some}
import gleam/time/duration
import gleam/time/timestamp.{type Timestamp}
import gleeunit
import vectors

import fsrs.{type Config, type Rating, Again, Easy, Good, Memory}

pub fn main() -> Nil {
  gleeunit.main()
}

/// 2026-01-01T12:00:00Z -- the instant the generated scenarios start from.
const start_unix = 1_767_268_800

/// 2026-01-01T00:00:00Z -- the base for the retrievability vectors.
const base_unix = 1_767_225_600

/// `int.range` is a fold, so this materialises the list these sweeps want.
fn seq(count: Int) -> List(Int) {
  int.range(from: 0, to: count, with: [], run: fn(acc, index) { [index, ..acc] })
}

fn at(unix: Int) -> Timestamp {
  timestamp.from_unix_seconds(unix)
}

fn config() -> Config {
  fsrs.Config(..fsrs.default_config(), enable_fuzz: False)
}

fn rating(value: Int) -> Rating {
  let assert Ok(rating) = fsrs.rating_from_int(value)
  rating
}

/// Compare with a relative tolerance. Both implementations run the same
/// float64 operations in the same order, so agreement should be near-exact;
/// the tolerance absorbs only last-bit differences between the Erlang and
/// JavaScript maths libraries.
fn close(actual: Float, expected: Float, label: String) -> Nil {
  let tolerance = 1.0e-9 *. float.max(1.0, float.absolute_value(expected))
  case float.absolute_value(actual -. expected) <=. tolerance {
    True -> Nil
    False ->
      panic as {
        label
        <> ": expected "
        <> float.to_string(expected)
        <> " but got "
        <> float.to_string(actual)
      }
  }
}

fn equal(actual: Int, expected: Int, label: String) -> Nil {
  case actual == expected {
    True -> Nil
    False ->
      panic as {
        label
        <> ": expected "
        <> int.to_string(expected)
        <> " but got "
        <> int.to_string(actual)
      }
  }
}

// --- parameters ------------------------------------------------------------

pub fn default_parameters_match_upstream_test() -> Nil {
  equal(
    list.length(fsrs.default_parameters),
    21,
    "FSRS-6 must have 21 parameters",
  )
  list.zip(fsrs.default_parameters, vectors.parameters)
  |> list.index_map(fn(pair, index) {
    close(pair.0, pair.1, "w" <> int.to_string(index))
  })
  Nil
}

/// A parameter list of the wrong length must fall back to the defaults rather
/// than crash a review or schedule nonsense.
pub fn malformed_parameters_fall_back_test() -> Nil {
  let broken = fsrs.Config(..config(), parameters: [1.0, 2.0])
  close(
    fsrs.initial_memory(broken, Good).stability,
    fsrs.initial_memory(config(), Good).stability,
    "malformed parameters fall back to defaults",
  )
}

// --- scalar conformance ----------------------------------------------------

pub fn initial_stability_test() -> Nil {
  use #(value, expected) <- list.each(vectors.initial_stability)
  close(
    fsrs.initial_memory(config(), rating(value)).stability,
    expected,
    "initial_stability(" <> int.to_string(value) <> ")",
  )
}

pub fn initial_difficulty_test() -> Nil {
  use #(value, expected) <- list.each(vectors.initial_difficulty)
  close(
    fsrs.initial_memory(config(), rating(value)).difficulty,
    expected,
    "initial_difficulty(" <> int.to_string(value) <> ")",
  )
}

pub fn next_difficulty_test() -> Nil {
  use #(difficulty, value, expected) <- list.each(vectors.next_difficulty)
  close(
    fsrs.next_difficulty(config(), difficulty, rating(value)),
    expected,
    "next_difficulty("
      <> float.to_string(difficulty)
      <> ", "
      <> int.to_string(value)
      <> ")",
  )
}

pub fn short_term_stability_test() -> Nil {
  use #(stability, value, expected) <- list.each(vectors.short_term_stability)
  close(
    fsrs.short_term_stability(config(), stability, rating(value)),
    expected,
    "short_term_stability("
      <> float.to_string(stability)
      <> ", "
      <> int.to_string(value)
      <> ")",
  )
}

pub fn recall_stability_test() -> Nil {
  use #(stability, difficulty, retrievability, value, expected) <- list.each(
    vectors.recall_stability,
  )
  close(
    fsrs.recall_stability(
      config(),
      Memory(stability, difficulty),
      retrievability,
      rating(value),
    ),
    expected,
    "recall_stability("
      <> float.to_string(stability)
      <> ", "
      <> float.to_string(difficulty)
      <> ", "
      <> float.to_string(retrievability)
      <> ", "
      <> int.to_string(value)
      <> ")",
  )
}

pub fn forget_stability_test() -> Nil {
  use #(stability, difficulty, retrievability, expected) <- list.each(
    vectors.forget_stability,
  )
  close(
    fsrs.forget_stability(
      config(),
      Memory(stability, difficulty),
      retrievability,
    ),
    expected,
    "forget_stability("
      <> float.to_string(stability)
      <> ", "
      <> float.to_string(difficulty)
      <> ", "
      <> float.to_string(retrievability)
      <> ")",
  )
}

pub fn next_interval_test() -> Nil {
  use #(stability, expected) <- list.each(vectors.next_interval)
  equal(
    fsrs.next_interval_days(config(), stability),
    expected,
    "next_interval(" <> float.to_string(stability) <> ")",
  )
}

pub fn retrievability_test() -> Nil {
  use #(stability, days, expected) <- list.each(vectors.retrievability)
  close(
    fsrs.retrievability_after(config(), stability, days),
    expected,
    "retrievability("
      <> float.to_string(stability)
      <> ", "
      <> int.to_string(days)
      <> "d)",
  )
}

/// Elapsed time is measured in WHOLE days, matching upstream. A review 23
/// hours later must score the same retrievability as one at the same instant,
/// not something in between.
pub fn retrievability_uses_whole_days_test() -> Nil {
  let card =
    fsrs.Card(
      state: fsrs.Review,
      memory: Some(Memory(10.0, 5.0)),
      due: at(base_unix),
      last_review: Some(at(base_unix)),
    )
  let same = fsrs.retrievability(card, at(base_unix), config())
  let almost_a_day = fsrs.retrievability(card, at(base_unix + 82_800), config())
  close(almost_a_day, same, "23h elapsed still counts as day zero")
}

// --- end-to-end scenarios --------------------------------------------------

fn state_code(state: fsrs.State) -> Int {
  case state {
    fsrs.Learning(_) -> 1
    fsrs.Review -> 2
    fsrs.Relearning(_) -> 3
  }
}

fn step_index(state: fsrs.State) -> Int {
  case state {
    fsrs.Learning(step) -> step
    fsrs.Relearning(step) -> step
    // Upstream stores `None` once a card graduates; the vectors encode that
    // as -1.
    fsrs.Review -> -1
  }
}

fn seconds_from_start(moment: Timestamp) -> Int {
  let #(seconds, _) =
    duration.to_seconds_and_nanoseconds(timestamp.difference(
      at(start_unix),
      moment,
    ))
  seconds
}

pub fn scenarios_test() -> Nil {
  use scenario <- list.each(vectors.scenarios())
  // A fuzz of -1.0 marks a scenario generated with fuzzing switched off.
  let fuzzing = scenario.fuzz >=. 0.0
  let scenario_config =
    fsrs.Config(..fsrs.default_config(), enable_fuzz: fuzzing)
  let sample = case fuzzing {
    True -> scenario.fuzz
    False -> 0.0
  }

  list.fold(scenario.steps, fsrs.new_card(at(start_unix)), fn(card, expected) {
    let card =
      fsrs.review(
        card,
        rating(expected.rating),
        at(start_unix + expected.at_seconds),
        scenario_config,
        sample,
      )
    let where =
      scenario.name <> " @" <> int.to_string(expected.at_seconds) <> "s"
    equal(state_code(card.state), expected.state, where <> " state")
    equal(step_index(card.state), expected.step, where <> " step")
    equal(
      seconds_from_start(card.due),
      expected.due_seconds,
      where <> " due_seconds",
    )
    let assert Some(memory) = card.memory
    close(memory.stability, expected.stability, where <> " stability")
    close(memory.difficulty, expected.difficulty, where <> " difficulty")
    card
  })
  Nil
}

// --- invariants ------------------------------------------------------------

/// A small LCG, so the sweep below is identical on Erlang and JavaScript.
/// The constants are deliberately tiny: anything larger overflows JavaScript's
/// 53-bit integers and would diverge from Erlang's bignums, which is exactly
/// the class of bug these cross-target tests exist to catch.
fn next_seed(seed: Int) -> Int {
  { seed * 75 + 74 } % 65_537
}

fn walk(
  card: fsrs.Card,
  seed: Int,
  remaining: Int,
  now: Int,
  check: fn(fsrs.Card) -> Nil,
) -> Nil {
  case remaining {
    0 -> Nil
    _ -> {
      let seed = next_seed(seed)
      let value = seed % 4 + 1
      // Advance between zero and three days, so both the same-day and the
      // long-term branches get exercised.
      let now = now + { seed % 4 } * 86_400
      let card = fsrs.review(card, rating(value), at(now), config(), 0.0)
      check(card)
      walk(card, seed, remaining - 1, now, check)
    }
  }
}

pub fn invariants_hold_over_random_walks_test() -> Nil {
  use seed <- list.each(seq(300))
  use card <- walk(fsrs.new_card(at(start_unix)), seed, 20, start_unix)
  let assert Some(memory) = card.memory
  case memory.difficulty >=. 1.0 && memory.difficulty <=. 10.0 {
    True -> Nil
    False ->
      panic as {
        "difficulty escaped [1, 10]: " <> float.to_string(memory.difficulty)
      }
  }
  case memory.stability >=. 0.001 {
    True -> Nil
    False ->
      panic as {
        "stability fell below the floor: " <> float.to_string(memory.stability)
      }
  }
  case fsrs.interval_seconds(card, at(start_unix)) > 0 {
    True -> Nil
    False -> panic as "a rescheduled card must be due in the future"
  }
}

/// Pressing Easy over and over must never shorten the interval.
pub fn repeated_easy_never_shortens_test() -> Nil {
  let steps = seq(12)
  list.fold(steps, #(fsrs.new_card(at(start_unix)), start_unix, 0), fn(acc, _) {
    let #(card, now, previous) = acc
    let card = fsrs.review(card, Easy, at(now), config(), 0.0)
    let interval = fsrs.interval_seconds(card, at(now))
    case interval >= previous {
      True -> Nil
      False ->
        panic as {
          "Easy shortened the interval: "
          <> int.to_string(previous)
          <> " -> "
          <> int.to_string(interval)
        }
    }
    #(card, now + interval, interval)
  })
  Nil
}

/// Lapsing a mature card must collapse its interval, not merely dent it.
pub fn again_collapses_a_mature_card_test() -> Nil {
  let card =
    fsrs.Card(
      state: fsrs.Review,
      memory: Some(Memory(200.0, 5.0)),
      due: at(start_unix),
      last_review: Some(at(start_unix - 200 * 86_400)),
    )
  let lapsed = fsrs.review(card, Again, at(start_unix), config(), 0.0)
  let assert Some(memory) = lapsed.memory
  case memory.stability <. 200.0 {
    True -> Nil
    False -> panic as "Again must reduce stability"
  }
  // With relearning steps configured, a lapse drops into Relearning rather
  // than staying in Review.
  case lapsed.state {
    fsrs.Relearning(0) -> Nil
    _ -> panic as "a lapse should enter Relearning at step 0"
  }
}

// --- preview ---------------------------------------------------------------

pub fn preview_covers_every_button_test() -> Nil {
  let card =
    fsrs.review(
      fsrs.new_card(at(start_unix)),
      Good,
      at(start_unix),
      config(),
      0.0,
    )
  let previews = fsrs.preview(card, at(start_unix + 86_400), config())
  equal(list.length(previews), 4, "preview returns one entry per rating")
  let ratings = list.map(previews, fn(pair) { fsrs.rating_to_int(pair.0) })
  case ratings == [1, 2, 3, 4] {
    True -> Nil
    False -> panic as "preview must be ordered Again, Hard, Good, Easy"
  }
}

/// The preview must be what actually happens, or the numbers on the buttons
/// are a lie. Fuzz is the one permitted difference, and preview disables it.
pub fn preview_matches_review_test() -> Nil {
  let card =
    fsrs.review(
      fsrs.new_card(at(start_unix)),
      Good,
      at(start_unix),
      config(),
      0.0,
    )
  let now = at(start_unix + 86_400)
  use #(rating, previewed) <- list.each(fsrs.preview(card, now, config()))
  let actual = fsrs.review(card, rating, now, config(), 0.0)
  equal(
    fsrs.interval_seconds(previewed, now),
    fsrs.interval_seconds(actual, now),
    "preview interval for rating " <> int.to_string(fsrs.rating_to_int(rating)),
  )
}

/// Previewing must never mutate the card it is asked about -- it is called on
/// every render of the grading bar.
pub fn preview_leaves_the_card_alone_test() -> Nil {
  let card =
    fsrs.review(
      fsrs.new_card(at(start_unix)),
      Good,
      at(start_unix),
      config(),
      0.0,
    )
  let _ = fsrs.preview(card, at(start_unix + 86_400), config())
  let assert Some(memory) = card.memory
  close(memory.stability, 2.3065, "card unchanged after preview")
}

// --- configuration edge cases ----------------------------------------------

/// With no relearning steps, a lapse stays in Review and simply takes the much
/// shorter interval its collapsed stability earns.
pub fn lapse_without_relearning_steps_stays_in_review_test() -> Nil {
  let config = fsrs.Config(..config(), relearning_steps: [])
  let card =
    fsrs.Card(
      state: fsrs.Review,
      memory: Some(Memory(50.0, 5.0)),
      due: at(start_unix),
      last_review: Some(at(start_unix - 50 * 86_400)),
    )
  let lapsed = fsrs.review(card, Again, at(start_unix), config, 0.0)
  case lapsed.state {
    fsrs.Review -> Nil
    _ -> panic as "with no relearning steps a lapse stays in Review"
  }
}

/// With no learning steps at all, a new card graduates immediately.
pub fn no_learning_steps_graduates_immediately_test() -> Nil {
  let config = fsrs.Config(..config(), learning_steps: [])
  let card =
    fsrs.review(
      fsrs.new_card(at(start_unix)),
      Good,
      at(start_unix),
      config,
      0.0,
    )
  case card.state {
    fsrs.Review -> Nil
    _ -> panic as "with no learning steps the card should graduate at once"
  }
}

/// A card holding a step index past the end of a shortened step list must
/// graduate rather than get stuck.
pub fn overlong_step_index_graduates_test() -> Nil {
  let config = fsrs.Config(..config(), learning_steps: [1])
  let card =
    fsrs.Card(
      state: fsrs.Learning(5),
      memory: Some(Memory(3.0, 5.0)),
      due: at(start_unix),
      last_review: Some(at(start_unix - 86_400)),
    )
  let reviewed = fsrs.review(card, Good, at(start_unix), config, 0.0)
  case reviewed.state {
    fsrs.Review -> Nil
    _ -> panic as "a stale step index should graduate the card"
  }
}

/// Lower desired retention must produce longer intervals. This is the knob a
/// user actually turns, so it is worth pinning the direction.
pub fn lower_retention_lengthens_intervals_test() -> Nil {
  let strict = fsrs.Config(..config(), desired_retention: 0.95)
  let loose = fsrs.Config(..config(), desired_retention: 0.8)
  let strict_days = fsrs.next_interval_days(strict, 50.0)
  let loose_days = fsrs.next_interval_days(loose, 50.0)
  case loose_days > strict_days {
    True -> Nil
    False ->
      panic as {
        "0.8 retention should schedule further out than 0.95: "
        <> int.to_string(loose_days)
        <> " vs "
        <> int.to_string(strict_days)
      }
  }
}

pub fn maximum_interval_is_respected_test() -> Nil {
  let config = fsrs.Config(..config(), maximum_interval: 30)
  equal(
    fsrs.next_interval_days(config, 100_000.0),
    30,
    "maximum_interval caps the schedule",
  )
}
