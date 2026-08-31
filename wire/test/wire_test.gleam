//// Round-trip tests: for every payload, encoding then decoding must be the
//// identity. Run on both targets (`make wire-test`), because the whole reason
//// this package exists is that the two sides used to disagree.

import fsrs
import gleam/json
import gleam/option.{None, Some}
import gleeunit
import gleeunit/should
import wire

pub fn main() {
  gleeunit.main()
}

/// Encode with the package's own encoder, parse with its own decoder, and
/// expect exactly what went in.
fn round_trip(value: a, to_json: fn(a) -> json.Json, decoder) -> Nil {
  value
  |> to_json
  |> json.to_string
  |> json.parse(using: decoder)
  |> should.equal(Ok(value))
}

// --- the cross-target float trap -------------------------------------------

/// JavaScript's `JSON.stringify` renders a whole float as `1787788818`;
/// Erlang keeps `1787788818.0`. A decoder that only accepts one of those
/// rejects the other side's perfectly good numbers.
pub fn lenient_float_accepts_a_bare_integer_test() {
  json.parse(from: "1787788818", using: wire.lenient_float())
  |> should.equal(Ok(1_787_788_818.0))
}

pub fn lenient_float_accepts_a_decimal_test() {
  json.parse(from: "1787788818.0", using: wire.lenient_float())
  |> should.equal(Ok(1_787_788_818.0))
}

pub fn moment_accepts_either_shape_test() {
  let from_int = json.parse(from: "1787788818", using: wire.moment())
  let from_float = json.parse(from: "1787788818.0", using: wire.moment())
  from_int |> should.equal(from_float)
}

// --- state codes -----------------------------------------------------------

pub fn state_codes_round_trip_test() {
  [fsrs.Learning(0), fsrs.Learning(3), fsrs.Review, fsrs.Relearning(1)]
  |> should.equal(
    [fsrs.Learning(0), fsrs.Learning(3), fsrs.Review, fsrs.Relearning(1)]
    |> list_map(fn(state) {
      wire.state_from(wire.state_code(state), wire.state_step(state))
    }),
  )
}

/// A code the database has never produced still has to yield a card, not a
/// crash: an unshowable card is worse than a rescheduled one.
pub fn unknown_state_code_falls_back_to_learning_test() {
  wire.state_from(99, None) |> should.equal(fsrs.Learning(0))
  wire.state_from(0, Some(2)) |> should.equal(fsrs.Learning(2))
}

// --- ratings ---------------------------------------------------------------

pub fn rating_decoder_accepts_the_four_grades_test() {
  json.parse(from: "1", using: wire.rating_decoder())
  |> should.equal(Ok(fsrs.Again))
  json.parse(from: "4", using: wire.rating_decoder())
  |> should.equal(Ok(fsrs.Easy))
}

/// The server used to send `rating` as a bare Int and the client modelled it
/// as an fsrs.Rating. Now that one type crosses, an out-of-range code has to
/// fail at the boundary rather than downstream.
pub fn rating_decoder_rejects_an_out_of_range_code_test() {
  json.parse(from: "0", using: wire.rating_decoder())
  |> should.be_error
  json.parse(from: "9", using: wire.rating_decoder())
  |> should.be_error
}

// --- payload round trips ---------------------------------------------------

pub fn problem_ref_round_trips_test() {
  round_trip(a_ref(), wire.ref_to_json, wire.ref_decoder())
}

pub fn user_round_trips_test() {
  round_trip(a_user(), wire.user_to_json, wire.user_decoder())
}

pub fn session_round_trips_test() {
  round_trip(
    wire.Session(token: "tok_abc", user: a_user()),
    wire.session_to_json,
    wire.session_decoder(),
  )
}

pub fn a_reviewed_card_round_trips_test() {
  round_trip(a_card(), wire.card_to_json, wire.card_decoder())
}

/// A card that has never been answered carries no memory and no last review,
/// and the nulls have to survive the trip as `None` rather than as zeroes.
pub fn a_fresh_card_round_trips_test() {
  let card =
    wire.CardState(
      ..a_card(),
      card: fsrs.Card(
        state: fsrs.Learning(0),
        memory: None,
        due: fsrs.from_epoch(1_787_788_818.0),
        last_review: None,
      ),
      introduced_at: None,
    )
  round_trip(card, wire.card_to_json, wire.card_decoder())
}

pub fn a_suspended_card_round_trips_test() {
  round_trip(
    wire.CardState(..a_card(), suspended: True),
    wire.card_to_json,
    wire.card_decoder(),
  )
}

pub fn draft_round_trips_test() {
  round_trip(
    #(a_ref(), "def solve(nums):\n    return nums\n"),
    wire.draft_to_json,
    wire.draft_decoder(),
  )
}

pub fn today_round_trips_test() {
  round_trip(a_today(), wire.today_to_json, wire.today_decoder())
}

pub fn default_settings_round_trip_test() {
  round_trip(
    wire.default_settings(),
    wire.settings_to_json,
    wire.settings_decoder(),
  )
}

pub fn customised_settings_round_trip_test() {
  let settings =
    wire.Settings(
      ..wire.default_settings(),
      new_per_day: 3,
      reviews_per_day: 12,
      day_start_hour: 2,
      timezone: "Europe/Lisbon",
    )
  round_trip(settings, wire.settings_to_json, wire.settings_decoder())
}

pub fn boot_state_round_trips_test() {
  let state =
    wire.BootState(
      now: fsrs.from_epoch(1_787_788_818.0),
      user: a_user(),
      settings: wire.default_settings(),
      cards: [a_card()],
      drafts: [#(a_ref(), "draft body")],
      today: a_today(),
    )
  round_trip(state, wire.boot_state_to_json, wire.boot_state_decoder())
}

pub fn review_outcome_round_trips_test() {
  let outcome =
    wire.ReviewOutcome(
      now: fsrs.from_epoch(1_787_788_818.0),
      card: a_card(),
      today: a_today(),
    )
  round_trip(
    outcome,
    wire.review_outcome_to_json,
    wire.review_outcome_decoder(),
  )
}

pub fn stats_round_trips_test() {
  let stats =
    wire.Stats(
      total_reviews: 412,
      mature_reviews: 190,
      mature_correct: 171,
      state_counts: [#(1, 12), #(2, 88), #(3, 4)],
      history: [
        wire.DayTally(days_ago: 0, total: 9, correct: 8),
        wire.DayTally(days_ago: 1, total: 14, correct: 14),
      ],
      forecast: [#(0, 9), #(1, 15), #(2, 0)],
      streak_days: 6,
    )
  round_trip(stats, wire.stats_to_json, wire.stats_decoder())
}

/// Empty collections are the shape a brand-new account actually sends, and an
/// encoder that emits `null` instead of `[]` breaks the first render.
pub fn empty_stats_round_trip_test() {
  let stats =
    wire.Stats(
      total_reviews: 0,
      mature_reviews: 0,
      mature_correct: 0,
      state_counts: [],
      history: [],
      forecast: [],
      streak_days: 0,
    )
  round_trip(stats, wire.stats_to_json, wire.stats_decoder())
}

pub fn insights_round_trip_test() {
  let insights =
    wire.Insights(
      clean_solves: [
        wire.CleanSolve(
          problem: a_ref(),
          at: fsrs.from_epoch(1_787_700_000.0),
          duration_ms: 161_000,
        ),
      ],
      reveals: [#(a_ref(), 3)],
      calibration: [
        wire.Calibration(rating: fsrs.Again, total: 20, passed: 9),
        wire.Calibration(rating: fsrs.Easy, total: 8, passed: 5),
      ],
    )
  round_trip(insights, wire.insights_to_json, wire.insights_decoder())
}

pub fn review_row_round_trips_test() {
  let row =
    wire.ReviewRow(
      at: fsrs.from_epoch(1_787_700_000.0),
      rating: fsrs.Good,
      duration_ms: Some(161_000),
      revealed: False,
      auto_failed: False,
      state_before: 2,
      scheduled_days: 15,
      stability_after: Some(21.4),
    )
  round_trip(row, wire.review_row_to_json, wire.review_row_decoder())
}

/// An untimed review, and one where the harness failed: both nullable fields
/// at once.
pub fn review_row_without_a_duration_round_trips_test() {
  let row =
    wire.ReviewRow(
      at: fsrs.from_epoch(1_787_700_000.0),
      rating: fsrs.Again,
      duration_ms: None,
      revealed: True,
      auto_failed: True,
      state_before: 1,
      scheduled_days: 0,
      stability_after: None,
    )
  round_trip(row, wire.review_row_to_json, wire.review_row_decoder())
}

pub fn review_round_trips_test() {
  let review =
    wire.Review(
      problem: a_ref(),
      rating: fsrs.Hard,
      duration_ms: Some(240_000),
      auto_failed: False,
      revealed: False,
      practice: False,
    )
  round_trip(review, wire.review_to_json, wire.review_decoder())
}

pub fn practice_review_round_trips_test() {
  let review =
    wire.Review(
      problem: a_ref(),
      rating: fsrs.Easy,
      duration_ms: None,
      auto_failed: False,
      revealed: True,
      practice: True,
    )
  round_trip(review, wire.review_to_json, wire.review_decoder())
}

/// Older clients omit `practice` entirely. It has to default rather than 422,
/// or a stale tab starts failing every submission.
pub fn review_without_practice_defaults_to_false_test() {
  let body =
    "{\"category\":\"c\",\"subcategory\":\"s\",\"title\":\"t\",\"rating\":3,"
    <> "\"durationMs\":null,\"autoFailed\":false,\"revealed\":false}"
  json.parse(from: body, using: wire.review_decoder())
  |> should.equal(
    Ok(wire.Review(
      problem: wire.ProblemRef(category: "c", subcategory: "s", title: "t"),
      rating: fsrs.Good,
      duration_ms: None,
      auto_failed: False,
      revealed: False,
      practice: False,
    )),
  )
}

/// `introducedAt` was added after the first cards were written; a payload
/// without it must still decode.
pub fn card_without_introduced_at_decodes_test() {
  let body =
    "{\"category\":\"c\",\"subcategory\":\"s\",\"title\":\"t\",\"state\":2,"
    <> "\"step\":null,\"stability\":3.5,\"difficulty\":5.1,\"due\":1787788818,"
    <> "\"lastReview\":null,\"reps\":4,\"lapses\":1,\"suspended\":false}"
  json.parse(from: body, using: wire.card_decoder())
  |> should.be_ok
}

// --- fixtures --------------------------------------------------------------

fn a_ref() -> wire.ProblemRef {
  wire.ProblemRef(
    category: "NeetCode 150 · Python",
    subcategory: "Arrays & Hashing",
    title: "Contains Duplicate",
  )
}

fn a_user() -> wire.User {
  wire.User(id: "0198f0aa-0000-7000-8000-000000000000", email: "a@example.com")
}

fn a_card() -> wire.CardState {
  wire.CardState(
    problem: a_ref(),
    card: fsrs.Card(
      state: fsrs.Review,
      memory: Some(fsrs.Memory(stability: 12.5, difficulty: 5.25)),
      due: fsrs.from_epoch(1_787_788_818.0),
      last_review: Some(fsrs.from_epoch(1_787_700_000.0)),
    ),
    reps: 7,
    lapses: 2,
    suspended: False,
    introduced_at: Some(fsrs.from_epoch(1_780_000_000.0)),
  )
}

fn a_today() -> wire.Today {
  wire.Today(
    day_start: fsrs.from_epoch(1_787_760_000.0),
    day_end: fsrs.from_epoch(1_787_846_400.0),
    reviews_done: 9,
    new_introduced: 2,
    reviews_remaining: 91,
    new_remaining: 8,
    due_now: 4,
  )
}

fn list_map(items: List(a), f: fn(a) -> b) -> List(b) {
  case items {
    [] -> []
    [first, ..rest] -> [f(first), ..list_map(rest, f)]
  }
}
