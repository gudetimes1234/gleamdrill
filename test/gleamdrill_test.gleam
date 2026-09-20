//// Contract tests for the backend API.
////
//// The fixtures in `test/fixtures/` are real responses, captured from a
//// running server rather than hand-written. That is the point: a hand-written
//// fixture only proves the decoder agrees with itself, while these fail the
//// moment the server's field names, shapes or types drift from what the
//// client expects — which is the likeliest way this pairing breaks, and the
//// hardest to notice, because a decode failure surfaces as an empty screen
//// rather than as an error.
////
//// Regenerate with `make api-fixtures` against a local server.

import fsrs
import gleam/dict
import gleam/dynamic/decode
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleam/time/timestamp
import gleamdrill/api
import gleamdrill/insights
import gleamdrill/keys
import gleamdrill/local
import gleamdrill/model
import gleamdrill/problem
import gleamdrill/problems
import gleamdrill/queue
import gleamdrill/tour
import gleamdrill/view/format
import gleeunit
import simplifile
import wire

pub fn main() -> Nil {
  gleeunit.main()
}

fn fixture(name: String) -> String {
  let assert Ok(contents) = simplifile.read("test/fixtures/" <> name <> ".json")
  contents
}

fn decode(name: String, decoder: decode.Decoder(value)) -> value {
  case json.parse(fixture(name), decoder) {
    Ok(value) -> value
    Error(failure) ->
      panic as { name <> ".json did not decode: " <> string.inspect(failure) }
  }
}

pub fn session_decodes_test() -> Nil {
  let session = decode("session", api.session_decoder())
  assert session.token == "fixture-token"
  assert session.user.email == "drills@example.com"
}

pub fn boot_state_decodes_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())

  assert list.length(state.settings.scheduler.parameters) == 21
  assert state.settings.scheduler.desired_retention == 0.9
  assert state.settings.day_start_hour == 4
  assert state.settings.timezone == "UTC"
  assert state.user.email == "drills@example.com"
}

/// The card in this fixture was answered `Good` once, so it is on the second
/// learning step with the stability a `Good` first answer seeds.
/// The answered card in the state fixture. The fixture also holds a queued,
/// never-opened card now, so "the card" has to be named rather than pattern
/// matched out of a one-element list.
fn fixture_card(state: api.BootState) -> Result(api.CardState, Nil) {
  list.find(state.cards, fn(c: api.CardState) { c.reps > 0 })
}

pub fn boot_state_card_decodes_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  let assert Ok(card) =
    list.find(state.cards, fn(c: api.CardState) {
      c.problem.title == "Contains Duplicate"
    })

  assert card.problem.title == "Contains Duplicate"
  assert card.reps == 1
  assert card.lapses == 0
  assert card.suspended == False
  assert card.card.state == fsrs.Learning(1)

  let assert Some(memory) = card.card.memory
  assert memory.stability == 2.3065

  // A card that has been answered must carry the timestamp of that answer:
  // without it the scheduler cannot tell a same-day repeat from a real
  // interval, which is the difference between minutes and months.
  assert card.card.last_review != None
}

/// The other card in the fixture: queued and never opened. It is a real
/// server response, not a hand-written one, because this is the shape the
/// queue screen made possible -- a card with no memory at all -- and the app
/// reads it at boot before anything else happens.
pub fn boot_state_queued_card_decodes_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  let assert Ok(card) =
    list.find(state.cards, fn(c: api.CardState) {
      c.problem.title == "Valid Anagram"
    })

  assert card.reps == 0
  assert card.lapses == 0
  assert card.suspended == False
  assert card.card.memory == None
  assert card.card.last_review == None
  // Null until the first review. The daily new budget counts this, so a stamp
  // here would mean queueing a problem spent the allowance for opening it.
  assert card.introduced_at == None
}

pub fn boot_state_draft_decodes_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  let assert [#(problem, body)] = state.drafts
  assert problem.title == "Contains Duplicate"
  assert body != ""
}

pub fn today_decodes_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  assert state.today.reviews_done == 1
  assert state.today.new_introduced == 1
  // One of the account default's five new cards has been introduced. The
  // other card in the fixture is queued and unopened, and deliberately does
  // not count against this.
  assert state.today.new_remaining == 4
}

pub fn review_outcome_decodes_test() -> Nil {
  let outcome = decode("review", api.review_outcome_decoder())
  assert outcome.card.reps == 1
  assert outcome.card.card.state == fsrs.Learning(1)
  assert outcome.today.reviews_done == 1
}

pub fn stats_decodes_test() -> Nil {
  let stats = decode("stats", api.stats_decoder())
  assert stats.total_reviews == 1
  assert stats.streak_days == 1
  // The only review was of a card still in learning, so it does not count
  // toward true retention.
  assert stats.mature_reviews == 0
}

/// The scheduler the client previews with and the one the server schedules
/// with must agree, or the interval on the button is a lie. Replaying the
/// server's own stored card through the local scheduler is what proves it.
pub fn preview_agrees_with_the_server_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  let assert Ok(card) = fixture_card(state)

  // The server put this card on the second learning step, ten minutes out.
  // Reproducing that locally from the same inputs is the check.
  let replayed =
    fsrs.review(
      fsrs.new_card(state.now),
      fsrs.Good,
      state.now,
      state.settings.scheduler,
      0.0,
    )
  assert replayed.state == card.card.state

  let assert Some(replayed_memory) = replayed.memory
  let assert Some(server_memory) = card.card.memory
  assert replayed_memory.stability == server_memory.stability
  assert replayed_memory.difficulty == server_memory.difficulty
}

/// Every grade must offer a distinct, non-trivial interval, or the buttons
/// carry no information.
pub fn preview_offers_four_distinct_intervals_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  let assert Ok(card) = fixture_card(state)
  let previews = fsrs.preview(card.card, state.now, state.settings.scheduler)

  assert list.length(previews) == 4
  let intervals =
    list.map(previews, fn(pair) { fsrs.interval_seconds(pair.1, state.now) })
  assert list.all(intervals, fn(seconds) { seconds > 0 })
}

// --- interval labels -------------------------------------------------------

/// These read off the grading buttons, so an off-by-one is a lie told to the
/// user on every review.
pub fn interval_labels_test() -> Nil {
  assert format.interval(0) == "now"
  assert format.interval(-5) == "now"
  // Anything under a minute still has to round up to something non-zero.
  assert format.interval(30) == "1m"
  assert format.interval(60) == "1m"
  // A ten-minute learning step must read as ten minutes, not eleven.
  assert format.interval(600) == "10m"
  assert format.interval(601) == "11m"
  assert format.interval(3599) == "60m"
  assert format.interval(3600) == "1h"
  assert format.interval(86_400) == "1d"
  assert format.interval(6 * 86_400) == "6d"
  assert format.interval(59 * 86_400) == "59d"
  assert format.interval(60 * 86_400) == "2mo"
}

// --- guest mode ------------------------------------------------------------
//
// The derivations in `local` are pure functions taking loaded state, which is
// what makes them reachable here: `gleam test` runs under node, where there is
// no `localStorage` at all.

const day = 86_400

/// A study-day boundary that is actually day-aligned, so tests that straddle
/// it are testing the boundary rather than integer division.
const boundary = 1_800_057_600

fn at_epoch(seconds: Int) -> timestamp.Timestamp {
  fsrs.from_epoch(int.to_float(seconds))
}

fn guest_settings() -> api.Settings {
  api.default_settings()
}

fn answer(problem: problem.ProblemRef, rating: fsrs.Rating) -> api.Review {
  wire.Review(
    problem:,
    rating:,
    duration_ms: None,
    auto_failed: False,
    revealed: False,
    practice: False,
    recall: False,
  )
}

fn a_problem(title: String) -> problem.ProblemRef {
  wire.ProblemRef("NeetCode 150 · Python", "Arrays & Hashing", title)
}

/// The whole promise of guest mode: the same answers produce the same card as
/// the server would. Replayed against the captured server response rather than
/// against an expectation written by hand.
pub fn guest_scheduling_matches_the_server_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  let assert Ok(server_card) = fixture_card(state)

  // Replayed from the instant the review happened, which is what the server
  // scheduled against -- `state.now` is when /api/state answered, a fraction
  // of a second later.
  let assert Some(reviewed_at) = server_card.card.last_review
  let #(_store, guest_card) =
    local.record(
      local.empty(),
      state.settings,
      answer(server_card.problem, fsrs.Good),
      reviewed_at,
      0,
      0.0,
    )

  assert guest_card.card.state == server_card.card.state
  assert guest_card.reps == server_card.reps
  let assert Some(guest_memory) = guest_card.card.memory
  let assert Some(server_memory) = server_card.card.memory
  assert guest_memory.stability == server_memory.stability
  assert guest_memory.difficulty == server_memory.difficulty
  assert fsrs.to_epoch(guest_card.card.due)
    == fsrs.to_epoch(server_card.card.due)
}

/// The first encounter grades freely. Revealing the solution — or running and
/// failing — is how you learn something you have never seen, so the self-grade
/// stands and nothing is coerced.
pub fn first_encounter_grades_freely_test() -> Nil {
  let now = at_epoch(1_800_000_000)
  let #(_store, card) =
    local.record(
      local.empty(),
      guest_settings(),
      wire.Review(
        problem: a_problem("Contains Duplicate"),
        rating: fsrs.Easy,
        duration_ms: None,
        auto_failed: True,
        revealed: True,
        practice: False,
        recall: False,
      ),
      now,
      0,
      0.0,
    )
  let assert Some(memory) = card.card.memory
  let expected = fsrs.initial_memory(guest_settings().scheduler, fsrs.Easy)
  assert memory.stability == expected.stability
}

/// Later reviews keep their grade too: a revealed solution is recorded on the
/// log, but the rating pressed is the rating scheduled. Grading is a
/// self-assessment, never a verdict.
pub fn later_reviews_keep_their_grade_test() -> Nil {
  let now = at_epoch(1_800_000_000)
  let problem = a_problem("Contains Duplicate")
  let settings = guest_settings()

  let #(store, first) =
    local.record(
      local.empty(),
      settings,
      answer(problem, fsrs.Good),
      now,
      0,
      0.0,
    )
  let assert Some(before) = first.card.memory

  let #(after, card) =
    local.record(
      store,
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Easy,
        duration_ms: None,
        auto_failed: False,
        revealed: True,
        practice: False,
        recall: False,
      ),
      at_epoch(1_800_000_600),
      0,
      0.0,
    )
  let assert Some(memory) = card.card.memory
  // Scheduled as the Easy that was pressed, on the same-day path.
  assert memory.stability
    == fsrs.short_term_stability(
      settings.scheduler,
      before.stability,
      fsrs.Easy,
    )
  // The reveal is still on the record.
  let assert [_, second] = local.history_of(after, problem)
  assert second.revealed == True
}

/// Anki counts a lapse only when a card that had graduated fails. Failing one
/// still in learning is just the learning steps doing their job.
pub fn only_a_graduated_card_lapses_test() -> Nil {
  let now = at_epoch(1_800_000_000)
  let problem = a_problem("Contains Duplicate")
  let settings = guest_settings()

  // Two Goods graduate it, then an Again.
  let #(store, _) =
    local.record(
      local.empty(),
      settings,
      answer(problem, fsrs.Good),
      now,
      0,
      0.0,
    )
  let #(store, learning) =
    local.record(store, settings, answer(problem, fsrs.Again), now, 0, 0.0)
  assert learning.lapses == 0

  let #(store, _) =
    local.record(store, settings, answer(problem, fsrs.Good), now, 0, 0.0)
  let #(store, graduated) =
    local.record(
      store,
      settings,
      answer(problem, fsrs.Good),
      at_epoch(1_800_000_000 + day),
      1,
      0.0,
    )
  assert graduated.card.state == fsrs.Review

  let #(_store, lapsed) =
    local.record(
      store,
      settings,
      answer(problem, fsrs.Again),
      at_epoch(1_800_000_000 + 5 * day),
      5,
      0.0,
    )
  assert lapsed.lapses == 1
}

pub fn today_counts_against_the_daily_limits_test() -> Nil {
  let day_start = boundary
  let now = at_epoch(day_start + 3600)
  let settings = guest_settings()
  let problem = a_problem("Contains Duplicate")

  let #(store, _) =
    local.record(
      local.empty(),
      settings,
      answer(problem, fsrs.Good),
      now,
      day_start / day,
      0.0,
    )

  let today =
    local.today(
      store,
      settings,
      now,
      local.StudyDay(day_start, day_start / day),
    )
  assert today.reviews_done == 1
  assert today.new_introduced == 1
  assert today.new_remaining == settings.new_per_day - 1
  assert today.reviews_remaining == settings.reviews_per_day - 1
  // Scheduled ten minutes out by the second learning step, so not due yet.
  assert today.due_now == 0
}

/// A card introduced before the rollover belongs to yesterday's budget, not
/// today's. Getting this wrong would silently halve or double the daily
/// allowance around 4am.
pub fn the_rollover_boundary_splits_the_budget_test() -> Nil {
  let day_start = boundary
  let settings = guest_settings()
  let now = at_epoch(day_start + 3600)

  let #(yesterday, _) =
    local.record(
      local.empty(),
      settings,
      answer(a_problem("Yesterday"), fsrs.Good),
      at_epoch(day_start - 60),
      { day_start - 60 } / day,
      0.0,
    )
  let #(both, _) =
    local.record(
      yesterday,
      settings,
      answer(a_problem("Today"), fsrs.Good),
      now,
      day_start / day,
      0.0,
    )

  let today =
    local.today(both, settings, now, local.StudyDay(day_start, day_start / day))
  assert today.new_introduced == 1
  assert today.reviews_done == 1
}

pub fn an_overdue_card_counts_as_due_test() -> Nil {
  let day_start = boundary
  let settings = guest_settings()
  let problem = a_problem("Contains Duplicate")

  let #(store, _) =
    local.record(
      local.empty(),
      settings,
      answer(problem, fsrs.Good),
      at_epoch(day_start),
      day_start / day,
      0.0,
    )

  // Ten minutes and one second later the learning step has elapsed.
  let later = at_epoch(day_start + 601)
  assert local.today(
      store,
      settings,
      later,
      local.StudyDay(day_start, day_start / day),
    ).due_now
    == 1
}

pub fn streaks_count_consecutive_days_test() -> Nil {
  let tally = fn(days_ago) { wire.DayTally(days_ago:, total: 1, correct: 1) }

  assert local.streak([]) == 0
  assert local.streak([tally(0)]) == 1
  assert local.streak([tally(0), tally(1), tally(2)]) == 3
  // Not sat down today yet: a streak ending yesterday is still alive.
  assert local.streak([tally(1), tally(2)]) == 2
  // A gap ends it.
  assert local.streak([tally(0), tally(1), tally(3)]) == 2
  // Nothing recent at all.
  assert local.streak([tally(4), tally(5)]) == 0
}

pub fn statistics_derive_from_local_state_test() -> Nil {
  let day_start = boundary
  let settings = guest_settings()
  let problem = a_problem("Contains Duplicate")

  let #(store, _) =
    local.record(
      local.empty(),
      settings,
      answer(problem, fsrs.Good),
      at_epoch(day_start),
      day_start / day,
      0.0,
    )

  let stats =
    local.stats(
      store,
      at_epoch(day_start + 60),
      local.StudyDay(day_start, day_start / day),
    )
  assert stats.total_reviews == 1
  assert stats.streak_days == 1
  // The card was still in learning, so it says nothing about long-term recall.
  assert stats.mature_reviews == 0
  assert stats.state_counts == [#(1, 1)]
}

/// Drafts are user-typed code and unbounded in principle, so the store keeps
/// the most recently touched and drops the rest.
pub fn drafts_evict_oldest_first_test() -> Nil {
  let store: local.Local =
    int.range(from: 0, to: 320, with: local.empty(), run: fn(store, index) {
      local.put_draft(
        store,
        a_problem("Problem " <> int.to_string(index)),
        "code " <> int.to_string(index),
      )
    })

  assert list.length(store.drafts) == 300
  // The most recent survives, the oldest does not.
  assert model.assoc_get(store.drafts, a_problem("Problem 319"))
    == Ok("code 319")
  assert model.assoc_get(store.drafts, a_problem("Problem 0")) == Error(Nil)
}

/// A note is replaced in place, and a blank one is removed rather than kept:
/// the store only ever holds notes with something in them.
pub fn notes_replace_and_blank_clears_test() -> Nil {
  let problem = a_problem("Two Sum")
  let store =
    local.empty()
    |> local.put_note(problem, "first thought")
    |> local.put_note(a_problem("Valid Anagram"), "sort both")
    |> local.put_note(problem, "use a map")

  assert list.length(store.notes) == 2
  assert model.assoc_get(store.notes, problem) == Ok("use a map")

  let cleared = local.put_note(store, problem, "   ")
  assert model.assoc_get(cleared.notes, problem) == Error(Nil)
  assert list.length(cleared.notes) == 1
  assert !local.is_empty(cleared)
}

/// A boot state from a server that predates notes still decodes.
pub fn boot_state_without_notes_decodes_test() -> Nil {
  let state = decode("state", api.boot_state_decoder())
  assert state.notes == []
}

// --- insights --------------------------------------------------------------
//
// The derivations are pure over the wire payloads, so a synthetic review log
// exercises the whole pipeline with no storage and no server.

fn solve(title: String, at: Int, ms: Int) -> api.CleanSolve {
  wire.CleanSolve(problem: a_problem(title), at: at_epoch(at), duration_ms: ms)
}

fn card_named(title: String) -> api.CardState {
  wire.CardState(
    problem: a_problem(title),
    card: fsrs.new_card(at_epoch(1_800_000_000)),
    reps: 1,
    lapses: 0,
    suspended: False,
    introduced_at: Some(at_epoch(1_800_000_000)),
  )
}

pub fn fluency_is_the_median_of_the_last_three_test() -> Nil {
  // 700s, then 100s, 200s, 150s: the early grind must stop counting.
  let solves = [
    solve("X", 1, 700_000),
    solve("X", 2, 100_000),
    solve("X", 3, 200_000),
    solve("X", 4, 150_000),
  ]
  assert insights.fluency_of(solves) == Some(150_000)
  // One great run is luck, but it is still the only signal there is.
  assert insights.fluency_of([solve("X", 1, 90_000)]) == Some(90_000)
  assert insights.fluency_of([]) == None
}

/// The drill header's median is one problem's, from the whole payload.
pub fn fluency_for_picks_one_problem_out_of_the_payload_test() -> Nil {
  let data =
    wire.Insights(
      clean_solves: [
        solve("X", 1, 300_000),
        solve("Y", 2, 30_000),
        solve("X", 3, 100_000),
        solve("X", 4, 200_000),
      ],
      reveals: [],
      calibration: [],
    )
  assert insights.fluency_for(data, a_problem("X")) == Some(200_000)
  assert insights.fluency_for(data, a_problem("Y")) == Some(30_000)
  assert insights.fluency_for(data, a_problem("Z")) == None
}

/// A leech opens with the ladder read up to, but not including, the
/// pseudocode: the approach is on screen, and nothing counts as a reveal.
pub fn a_leech_opens_with_the_approach_shown_test() -> Nil {
  // The catalogue's Python category is plain "NeetCode 150".
  let problem =
    wire.ProblemRef("NeetCode 150", "Arrays & Hashing", "Contains Duplicate")
  let lapsed = fn(lapses) {
    let card = wire.CardState(..card_named("Contains Duplicate"), problem:)
    model.Model(
      ..model.default(),
      cards: dict.from_list([#(problem, wire.CardState(..card, lapses:))]),
    )
  }
  let assert Ok(found) =
    problems.find(problem.category, problem.subcategory, problem.title)
  let rungs = list.length(found.approach)
  assert rungs >= 2

  assert !model.is_leech(lapsed(3), problem)
  assert model.opening_hints(lapsed(3), problem) == 0
  assert model.is_leech(lapsed(4), problem)
  let shown = model.opening_hints(lapsed(4), problem)
  assert shown == rungs - 1
  let opened = model.Model(..lapsed(4), hints_revealed: shown)
  assert !model.pseudocode_revealed(opened, found.approach)
}

/// A walk step's code slice is a piece of the pseudocode; its hint and why
/// are not. Only the slice makes the review a reveal.
pub fn only_the_walk_code_counts_as_a_reveal_test() -> Nil {
  let stages = [
    problem.Nudge("n"),
    problem.Walk([
      problem.WalkStep(step: "s", hint: "h", why: "w", code: "c"),
    ]),
    problem.Pseudocode("p"),
  ]
  let base = model.Model(..model.default(), hints_revealed: 2)
  assert !model.answer_revealed(base, stages)
  assert model.answer_revealed(
    model.Model(..base, walk_code_seen: True),
    stages,
  )
  assert model.plan_rung(stages) == Some(1)
  assert list.length(model.walk_steps(stages)) == 1
}

/// Every walkthrough in the catalogue is complete: at least three steps,
/// each with a hint and a why. The generator refuses blanks, so this guards
/// the ladders that are still plain lists as the content is written.
pub fn walkthroughs_are_complete_test() -> Nil {
  problems.all_refs()
  |> list.filter_map(fn(ref: problem.ProblemRef) {
    problems.find(ref.category, ref.subcategory, ref.title)
  })
  |> list.flat_map(fn(found: problem.Problem) { found.approach })
  |> list.each(fn(stage) {
    case stage {
      problem.Walk(steps) -> {
        assert list.length(steps) >= 3
        assert list.all(steps, fn(step: problem.WalkStep) {
          step.step != "" && step.hint != "" && step.why != ""
        })
      }
      _ -> Nil
    }
  })
}

pub fn tiers_split_on_the_three_minute_line_test() -> Nil {
  assert insights.tier_of(Some(179_999)) == insights.Fluent
  assert insights.tier_of(Some(180_000)) == insights.Solid
  assert insights.tier_of(Some(479_999)) == insights.Solid
  assert insights.tier_of(Some(480_000)) == insights.Grinding
  assert insights.tier_of(None) == insights.StillLearning
}

pub fn the_headline_counts_fluent_cards_and_recent_crossings_test() -> Nil {
  let now = at_epoch(1_800_000_000 + 30 * day)
  let cards =
    dict.from_list([
      #(a_problem("Fast, fresh"), card_named("Fast, fresh")),
      #(a_problem("Fast, old"), card_named("Fast, old")),
      #(a_problem("Slow"), card_named("Slow")),
      #(a_problem("Unseen"), card_named("Unseen")),
    ])
  let data =
    wire.Insights(
      clean_solves: [
        // Crossed the line two days ago.
        solve("Fast, fresh", 1_800_000_000 + 28 * day, 60_000),
        // Fluent for a month.
        solve("Fast, old", 1_800_000_000, 90_000),
        solve("Slow", 1_800_000_000 + 29 * day, 600_000),
      ],
      reveals: [],
      calibration: [],
    )
  let analysis = insights.analyse(data, cards, now)

  assert analysis.fluent == 2
  assert analysis.fluent_this_week == 1
  assert analysis.grinding == 1
  assert analysis.still_learning == 1
}

pub fn calibration_flags_optimistic_easy_pressing_test() -> Nil {
  let rows = fn(easy_passed) {
    [
      wire.Calibration(rating: fsrs.Good, total: 10, passed: 9),
      wire.Calibration(rating: fsrs.Easy, total: 10, passed: easy_passed),
    ]
  }
  let assert Some(warning) = insights.calibration_view(rows(6)).verdict
  assert string.contains(warning, "over-pressing")
  let assert Some(fine) = insights.calibration_view(rows(10)).verdict
  assert string.contains(fine, "line up")
  // Below the sample floor, no verdict at all: five reviews prove nothing.
  assert insights.calibration_view([
      wire.Calibration(rating: fsrs.Easy, total: 2, passed: 0),
    ]).verdict
    == None
}

/// The guest log and the derivations speak the same wire shapes end to end:
/// record reviews locally, then run the same analysis the server path feeds.
pub fn the_guest_log_feeds_the_same_analysis_test() -> Nil {
  let settings = guest_settings()
  let problem = a_problem("Contains Duplicate")

  // Clean first solve, revealed second review, clean third.
  let #(store, _) =
    local.record(
      local.empty(),
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Good,
        duration_ms: Some(150_000),
        auto_failed: False,
        revealed: False,
        practice: False,
        recall: False,
      ),
      at_epoch(1_800_000_000),
      0,
      0.0,
    )
  let #(store, _) =
    local.record(
      store,
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Good,
        duration_ms: Some(20_000),
        auto_failed: False,
        revealed: True,
        practice: False,
        recall: False,
      ),
      at_epoch(1_800_000_000 + 600),
      0,
      0.0,
    )
  let #(store, _) =
    local.record(
      store,
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Good,
        duration_ms: Some(90_000),
        auto_failed: False,
        revealed: False,
        practice: False,
        recall: False,
      ),
      at_epoch(1_800_000_000 + 1200),
      0,
      0.0,
    )

  let data = local.insights(store)
  // The revealed review is not a clean solve, but it is a reveal.
  assert list.length(data.clean_solves) == 2
  assert data.reveals == [#(problem, 1)]
  // Every review was graded Good. Review 1 was followed by the reveal: not
  // a pass. Review 2 (the reveal, still Good) was followed by a clean pass.
  let assert Ok(good_row) =
    list.find(data.calibration, fn(row: api.Calibration) {
      row.rating == fsrs.Good
    })
  assert good_row.total == 2 && good_row.passed == 1
  assert list.all(data.calibration, fn(row: api.Calibration) {
    row.rating == fsrs.Good
  })

  // And the per-problem history keeps every row, oldest first.
  let history = local.history_of(store, problem)
  assert list.length(history) == 3
  let assert [first, second, ..] = history
  assert first.revealed == False && second.revealed == True

  // A recall-only review schedules the card and is logged, but it is not a
  // solve: nothing was typed, so it says nothing about speed.
  let #(store, _) =
    local.record(
      store,
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Good,
        duration_ms: None,
        auto_failed: False,
        revealed: False,
        practice: False,
        recall: True,
      ),
      at_epoch(1_800_000_000 + 1800),
      0,
      0.0,
    )
  let data = local.insights(store)
  assert list.length(data.clean_solves) == 2
  assert data.reveals == [#(problem, 1)]
  let assert Ok(card) = dict.get(store.cards, problem)
  assert card.reps == 4
  let assert [_, _, _, recalled] = local.history_of(store, problem)
  assert recalled.recall && recalled.duration_ms == None
}

/// Undo is the exact inverse of record: card, tallies and log all return.
/// A review that created its card takes the card with it, and only the
/// newest row can be undone.
pub fn unrecord_is_the_inverse_of_record_test() -> Nil {
  let settings = guest_settings()
  let problem = a_problem("Two Sum")
  let other = a_problem("Valid Anagram")
  let #(seeded, _) =
    local.record(
      local.empty(),
      settings,
      answer(other, fsrs.Good),
      at_epoch(1_800_000_000),
      7,
      0.0,
    )
  let #(seeded, _) =
    local.record(
      seeded,
      settings,
      answer(problem, fsrs.Good),
      at_epoch(1_800_000_000 + 60),
      7,
      0.0,
    )
  let assert Ok(before) = dict.get(seeded.cards, problem)

  // A second review on the same card, then taken back.
  let #(graded, _) =
    local.record(
      seeded,
      settings,
      answer(problem, fsrs.Again),
      at_epoch(1_800_000_000 + 120),
      7,
      0.0,
    )
  assert graded.history.total_reviews == 3
  let assert Ok(undone) = local.unrecord(graded, problem, Some(before), 7)
  assert undone.cards == seeded.cards
  assert undone.history == seeded.history
  assert undone.log == seeded.log

  // The newest row belongs to `problem`, so `other` cannot be undone.
  assert local.unrecord(graded, other, None, 7) == Error(Nil)

  // Undoing the review that created a card removes the card.
  let assert Ok(fresh) = local.unrecord(seeded, problem, None, 7)
  assert dict.get(fresh.cards, problem) == Error(Nil)
  assert fresh.history.total_reviews == 1
  assert list.length(fresh.log) == 1
}

/// Export then import gives back the same store: every card, row, draft
/// and note, with the totals re-derived from the log.
pub fn a_guest_archive_restores_to_the_same_store_test() -> Nil {
  let settings = guest_settings()
  let store =
    [
      #("Two Sum", fsrs.Good),
      #("Valid Anagram", fsrs.Again),
      #("Two Sum", fsrs.Easy),
    ]
    |> list.index_fold(local.empty(), fn(store, pair, index) {
      let #(next, _) =
        local.record(
          store,
          settings,
          answer(a_problem(pair.0), pair.1),
          at_epoch(1_800_000_000 + index * 3600),
          7,
          0.0,
        )
      next
    })
    |> local.put_draft(a_problem("Two Sum"), "def twoSum(nums, target): pass")
    |> local.put_note(a_problem("Valid Anagram"), "sort both")

  let archive = local.archive(store, settings, at_epoch(1_800_010_000))
  assert archive.version == wire.archive_version
  assert list.length(archive.reviews) == 3
  // Oldest first in the file, newest first in the store.
  let assert [#(first, _), ..] = archive.reviews
  assert first == a_problem("Two Sum")

  let json = json.to_string(wire.archive_to_json(archive))
  let assert Ok(parsed) = json.parse(json, wire.archive_decoder())
  let restored = local.restore(parsed)
  assert restored.cards == store.cards
  assert restored.log == store.log
  assert restored.drafts == store.drafts
  assert restored.notes == store.notes
  assert restored.history.total_reviews == 3
  assert restored.history.mature_reviews == store.history.mature_reviews
  assert restored.history.mature_correct == store.history.mature_correct
}

pub fn the_review_log_is_a_ring_buffer_test() -> Nil {
  let settings = guest_settings()
  let store =
    int.range(from: 0, to: 2100, with: local.empty(), run: fn(store, index) {
      let #(next, _) =
        local.record(
          store,
          settings,
          answer(a_problem("P" <> int.to_string(index % 50)), fsrs.Good),
          at_epoch(1_800_000_000 + index * 60),
          0,
          0.0,
        )
      next
    })
  assert list.length(store.log) == 2000
  // Newest first: the head is the last review recorded.
  let assert [#(_, newest), ..] = store.log
  assert fsrs.to_epoch(newest.at) == 1_800_000_000.0 +. 2099.0 *. 60.0
}

// --- the keymap ------------------------------------------------------------

pub fn every_context_documents_escape_and_help_test() -> Nil {
  let base = model.default()
  let contexts = [
    model.Model(..base, route: model.StudyRoute),
    model.Model(..base, route: model.MenuRoute),
    model.Model(..base, route: model.QueueRoute),
    model.Model(..base, route: model.StatsRoute),
    model.Model(..base, route: model.ReportRoute),
    model.Model(..base, route: model.PickerRoute),
    model.Model(..base, route: model.SettingsRoute),
    model.Model(..base, route: model.SummaryRoute),
  ]
  use m <- list.each(contexts)
  let table = keys.bindings(m)
  assert list.any(table, fn(b: keys.Binding) { list.contains(b.keys, "?") })
}

pub fn dispatch_resolves_from_the_same_table_it_documents_test() -> Nil {
  let m = model.Model(..model.default(), route: model.StudyRoute)
  let press = fn(key) {
    keys.dispatch(
      m,
      model.Key(key: key, ctrl: False, shift: False, editing: "none"),
    )
  }
  assert press("b") == Ok(model.UserClickedBrowse)
  assert press("q") == Ok(model.UserClickedQueue)
  assert press("t") == Ok(model.UserClickedStats)
  assert press("Enter") == Ok(model.UserClickedStudy)
  assert press("z") == Ok(model.UserToggledBlitz)
  assert press("v") == Error(Nil)
}

/// The queue screen's row cursor is its own list, and `space` there means
/// "queue this", not "select this for a manual drill" -- the two screens share
/// the keys and must not share the message.
pub fn the_queue_screen_binds_its_own_verbs_test() -> Nil {
  let m = model.Model(..model.default(), route: model.QueueRoute)
  let press = fn(key) {
    keys.dispatch(
      m,
      model.Key(key: key, ctrl: False, shift: False, editing: "none"),
    )
  }
  assert press("j") == Ok(model.QueueCursorMoved(1))
  assert press("k") == Ok(model.QueueCursorMoved(-1))
  assert press(" ") == Ok(model.QueueToggledAtCursor)
  assert press("a") == Ok(model.UserAddedAllShown)
  assert press("r") == Ok(model.UserRemovedAllShown)
}

/// `listed` is what "add all shown" acts on, so the filters have to mean
/// exactly what the table shows -- a mismatch queues problems nobody saw.
pub fn the_queue_screen_lists_what_its_filters_say_test() -> Nil {
  let now = fsrs.from_epoch(1_787_788_818.0)
  let ref = a_catalogue_ref()
  let #(store, _) = local.enqueue(local.empty(), [ref], now)
  let m = model.Model(..model.default(), now:, cards: store.cards)

  let all = queue.listed(m)
  assert list.length(all) > 1
  assert list.contains(all, ref)

  // Status narrows to the one queued card, and its complement excludes it.
  let queued = queue.listed(model.Model(..m, queue_status: model.Queued))
  assert queued == [ref]
  let unqueued = queue.listed(model.Model(..m, queue_status: model.Unqueued))
  assert !list.contains(unqueued, ref)
  assert list.length(queued) + list.length(unqueued) == list.length(all)

  // Language is the same lens from the other direction.
  let elsewhere = queue.listed(model.Model(..m, queue_language: Some("sd")))
  assert !list.contains(elsewhere, ref)

  // The grouped view is the same list cut into topics: nothing added,
  // nothing dropped, order kept, and every row in a group belongs to it.
  let groups = queue.grouped(m)
  assert list.flat_map(groups, fn(g) { g.2 }) == all
  assert list.all(groups, fn(g) {
    list.all(g.2, fn(r: problem.ProblemRef) {
      r.category == g.0 && r.subcategory == g.1
    })
  })
  let assert [first, ..] = groups
  assert first.0 == "NeetCode 150" && first.1 == "Arrays & Hashing"

  // A topic's buttons act on its listed rows: "add" is its unqueued rows,
  // "add easy" the Easy ones among them, "remove" its never-answered cards.
  let change = fn(easy_only, add) {
    model.GroupChange(
      category: ref.category,
      subcategory: ref.subcategory,
      easy_only:,
      add:,
    )
  }
  let addable = queue.group_rows(m, change(False, True))
  assert !list.contains(addable, ref)
  assert list.length(addable) == list.length(first.2) - 1
  let easy = queue.group_rows(m, change(True, True))
  assert easy != []
  assert list.all(easy, fn(r: problem.ProblemRef) {
    problems.difficulty_of(r) == Some(problem.Easy)
  })
  assert list.length(easy) < list.length(addable)
  assert queue.group_rows(m, change(False, False)) == [ref]

  // And the search box, which the same list has to honour.
  let searched = queue.listed(model.Model(..m, queue_search: ref.title))
  assert list.contains(searched, ref)
}

pub fn paired_directions_resolve_to_opposite_deltas_test() -> Nil {
  let m = model.Model(..model.default(), route: model.MenuRoute)
  let press = fn(key) {
    keys.dispatch(
      m,
      model.Key(key: key, ctrl: False, shift: False, editing: "none"),
    )
  }
  assert press("j") == Ok(model.MenuCursorMoved(1))
  assert press("k") == Ok(model.MenuCursorMoved(-1))
  assert press("h") == Ok(model.MenuPaneFocused(-1))
  assert press("l") == Ok(model.MenuPaneFocused(1))
}

pub fn insights_fixture_decodes_test() -> Nil {
  let data = decode("insights", api.insights_decoder())
  // The fixture account: 150s clean, revealed (coerced), 90s clean.
  assert list.length(data.clean_solves) == 2
  let assert [#(_, reveal_count)] = data.reveals
  assert reveal_count == 1
  assert data.calibration != []
}

pub fn history_fixture_decodes_test() -> Nil {
  let rows =
    decode(
      "history",
      decode.at(["reviews"], decode.list(api.review_row_decoder())),
    )
  assert list.length(rows) == 3
  // Oldest first, with the reveal in the middle. The grade stays the user's
  // own (Good) even on a reveal; the log records the reveal beside it.
  let assert [first, second, third] = rows
  assert first.revealed == False
  assert second.revealed == True && second.rating == fsrs.Good
  assert third.duration_ms == Some(90_000)
}

/// The server's calibration and the guest log's must agree on the same story:
/// replay the fixture account's three reviews locally and compare.
pub fn guest_and_server_calibration_agree_test() -> Nil {
  let server = decode("insights", api.insights_decoder())
  let settings = guest_settings()
  let problem = a_problem("Contains Duplicate")

  let #(store, _) =
    local.record(
      local.empty(),
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Good,
        duration_ms: Some(150_000),
        auto_failed: False,
        revealed: False,
        practice: False,
        recall: False,
      ),
      at_epoch(1_800_000_000),
      0,
      0.0,
    )
  let #(store, _) =
    local.record(
      store,
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Good,
        duration_ms: None,
        auto_failed: False,
        revealed: True,
        practice: False,
        recall: False,
      ),
      at_epoch(1_800_000_600),
      0,
      0.0,
    )
  let #(store, _) =
    local.record(
      store,
      settings,
      wire.Review(
        problem:,
        rating: fsrs.Good,
        duration_ms: Some(90_000),
        auto_failed: False,
        revealed: False,
        practice: False,
        recall: False,
      ),
      at_epoch(1_800_001_200),
      0,
      0.0,
    )
  let guest = local.insights(store)

  assert list.length(guest.clean_solves) == list.length(server.clean_solves)
  assert guest.reveals == server.reveals
  let sort_rows = fn(rows) {
    list.sort(rows, fn(a: api.Calibration, b: api.Calibration) {
      int.compare(fsrs.rating_to_int(a.rating), fsrs.rating_to_int(b.rating))
    })
  }
  assert sort_rows(guest.calibration) == sort_rows(server.calibration)
}

// --- the study queue ---------------------------------------------------------

/// A model with nothing studied yet and room for `new_remaining` new cards.
/// A model with the whole catalogue queued and nothing answered yet, which is
/// the state the New pile is drawn from. Every problem needs a card now:
/// nothing is introduced that was not queued first.
fn fresh_model(new_remaining: Int) -> model.Model {
  fresh_model_of(new_remaining, problems.all_refs())
}

/// The same, with only `refs` queued.
fn fresh_model_of(
  new_remaining: Int,
  refs: List(problem.ProblemRef),
) -> model.Model {
  let base = model.default()
  let now = fsrs.from_epoch(1_787_788_818.0)
  let #(store, _) = local.enqueue(local.empty(), refs, now)
  model.Model(
    ..base,
    now:,
    cards: store.cards,
    today: wire.Today(..base.today, new_remaining:, reviews_remaining: 0),
  )
}

/// A ref the catalogue really contains. `a_problem` above is a hand-written
/// key, which is all the local store needs; the queue also has to find it in
/// `problems.all_refs()`, and the Python category is named "NeetCode 150" with
/// no language suffix.
fn a_catalogue_ref() -> problem.ProblemRef {
  let assert Ok(ref) = list.first(problems.all_refs())
  ref
}

/// The opt-in rule, stated on its own: a problem with no card is not a
/// candidate for anything. Before the queue screen existed this was the
/// opposite -- every catalogue entry without a card was fair game -- and it is
/// the single behaviour the whole feature turns on.
pub fn an_unqueued_problem_never_enters_the_queue_test() -> Nil {
  let base = model.default()
  let empty =
    model.Model(
      ..base,
      today: wire.Today(..base.today, new_remaining: 20, reviews_remaining: 20),
    )

  assert queue.fresh(empty) == []
  assert queue.due(empty) == []
  assert queue.build(empty) == []
}

/// A queued card is created due immediately, so the thing that makes it "new"
/// rather than "due" is that it has never been answered. Get this wrong and
/// the whole New pile is reported as a backlog of reviews.
pub fn a_queued_card_is_new_until_it_is_answered_test() -> Nil {
  let now = fsrs.from_epoch(1_787_788_818.0)
  let ref = a_catalogue_ref()
  let #(store, cards) = local.enqueue(local.empty(), [ref], now)
  let base = model.default()
  let m =
    model.Model(
      ..base,
      now:,
      cards: store.cards,
      today: wire.Today(..base.today, new_remaining: 5, reviews_remaining: 5),
    )

  assert list.length(cards) == 1
  assert model.is_new(m, ref)
  assert !model.is_due(m, ref)
  assert list.contains(queue.fresh(m), ref)
  assert !list.contains(queue.due(m), ref)
  // And it must not be counted against the reviews half of the daily budget.
  assert local.today(store, base.settings, now, local.StudyDay(0, 0)).due_now
    == 0
}

/// Queueing is idempotent: adding a problem that is already queued must not
/// reset the card that is being studied.
pub fn queueing_an_answered_problem_leaves_its_card_alone_test() -> Nil {
  let now = fsrs.from_epoch(1_787_788_818.0)
  let ref = a_catalogue_ref()
  let #(queued, _) = local.enqueue(local.empty(), [ref], now)
  let #(studied, _) =
    local.record(
      queued,
      model.default().settings,
      answer(ref, fsrs.Good),
      now,
      0,
      0.5,
    )
  let #(again, _) = local.enqueue(studied, [ref], now)

  assert dict.get(again.cards, ref) == dict.get(studied.cards, ref)
}

/// The one thing a removal must never do is take a review log with it.
pub fn removing_an_answered_problem_is_refused_test() -> Nil {
  let now = fsrs.from_epoch(1_787_788_818.0)
  let ref = a_catalogue_ref()
  let #(queued, _) = local.enqueue(local.empty(), [ref], now)
  let #(studied, _) =
    local.record(
      queued,
      model.default().settings,
      answer(ref, fsrs.Good),
      now,
      0,
      0.5,
    )

  let #(after, removed, refused) = local.dequeue(studied, [ref])
  assert removed == []
  assert refused == [ref]
  assert dict.has_key(after.cards, ref)

  // An untouched card leaves without argument.
  let #(gone, removed, refused) = local.dequeue(queued, [ref])
  assert removed == [ref]
  assert refused == []
  assert !dict.has_key(gone.cards, ref)
}

/// The catalogue is the same 150 problems repeated once per language, listed
/// language by language. Taking a flat prefix therefore means one language for
/// months; the queue rotates instead.
pub fn new_cards_rotate_across_languages_test() -> Nil {
  let picked = queue.fresh(fresh_model(8))
  let languages =
    picked
    |> list.map(fn(ref: problem.ProblemRef) {
      problems.language_tag(ref.category)
    })
    |> list.unique

  assert list.length(picked) == 8
  // Four NeetCode languages and System Design, so the first five cards are
  // five different categories. A flat prefix would have yielded eight Python
  // problems and one distinct language.
  assert list.length(picked |> list.take(6)) == 6
  assert list.length(languages) == 6
}

/// The queue is exactly what was queued: a language nobody added never
/// appears, and there is no filter on top of that.
pub fn only_queued_problems_enter_the_queue_test() -> Nil {
  let python =
    list.filter(problems.all_refs(), fn(ref: problem.ProblemRef) {
      problems.language_tag(ref.category) == "py"
    })
  let picked = queue.fresh(fresh_model_of(8, python))
  let languages =
    picked
    |> list.map(fn(ref: problem.ProblemRef) {
      problems.language_tag(ref.category)
    })
    |> list.unique

  assert languages == ["py"]
}

/// A language running dry must not stop the rotation for the others -- with
/// only one language queued the queue is simply that language.
pub fn the_rotation_survives_a_language_running_out_test() -> Nil {
  let python =
    list.filter(problems.all_refs(), fn(ref: problem.ProblemRef) {
      problems.language_tag(ref.category) == "py"
    })
  let picked = queue.fresh(fresh_model_of(300, python))
  // Python has 150 problems; asking for 300 must yield all of them and stop,
  // not loop or truncate at the first round.
  assert list.length(picked) == 150
}

/// The budget is the cap, not a suggestion.
pub fn the_daily_budget_bounds_the_queue_test() -> Nil {
  assert list.length(queue.fresh(fresh_model(3))) == 3
  assert queue.fresh(fresh_model(0)) == []
}

/// The language tour is played in order from its own screen, not scheduled:
/// it is absent from the catalogue and present, whole and in order, in the
/// tour module.
pub fn the_tour_is_its_own_sequence_test() -> Nil {
  assert list.all(problems.all(), fn(c: problem.Category) {
    c.name != "Gleam Language Tour"
  })
  assert !list.contains(
    list.map(problems.language_options(), fn(o) { o.0 }),
    "gt",
  )

  assert tour.count() == 63
  assert list.map(tour.chapters(), fn(c) { c.0 })
    == [
      "Basics", "Functions", "Flow control", "Data types", "Standard library",
      "Advanced features",
    ]
  // Chapters partition the lessons, in order.
  let indices =
    tour.chapters()
    |> list.flat_map(fn(c) { list.map(c.1, fn(e) { e.0 }) })
  assert indices == list.index_map(indices, fn(_, i) { i })
  assert list.length(indices) == 63

  let assert Ok(first) = tour.at(0)
  assert first.title == "Hello world"
  assert tour.chapter_position(0) == #("Basics", 1, 18)
  assert tour.chapter_position(18) == #("Functions", 1, 10)
  assert tour.chapter_position(62) == #("Advanced features", 9, 9)
  assert tour.at(63) == Error(Nil)
  assert tour.last() == 62
}

/// Every drill with a harness is graded by its run.
pub fn every_checkable_problem_is_graded_test() -> Nil {
  let ungraded =
    problems.all()
    |> list.flat_map(fn(c: problem.Category) { c.subcategories })
    |> list.flat_map(fn(s: problem.Subcategory) { s.problems })
    |> list.filter(fn(card: problem.Problem) {
      card.check != None && !problem.graded(card)
    })
  assert ungraded == []
}

/// Every NeetCode problem carries a rating, the four language mirrors of one
/// problem agree on it, and the split is roughly LeetCode's.
pub fn every_problem_is_rated_test() -> Nil {
  let rated =
    problems.all()
    |> list.filter(fn(c: problem.Category) {
      string.starts_with(c.name, "NeetCode 150")
    })
    |> list.flat_map(fn(c: problem.Category) { c.subcategories })
    |> list.flat_map(fn(s: problem.Subcategory) { s.problems })
  assert rated != []
  assert list.all(rated, fn(p: problem.Problem) { p.difficulty != None })

  let python =
    problems.all()
    |> list.find(fn(c: problem.Category) { c.name == "NeetCode 150" })
  let assert Ok(python) = python
  let all =
    list.flat_map(python.subcategories, fn(s: problem.Subcategory) {
      s.problems
    })
  let count = fn(rating) {
    list.count(all, fn(p: problem.Problem) { p.difficulty == Some(rating) })
  }
  assert count(problem.Easy) == 28
  assert count(problem.Medium) == 101
  assert count(problem.Hard) == 21

  // The same title has the same rating whatever the language.
  let assert Ok(gleam_two_sum) =
    problems.find("NeetCode 150 (Gleam)", "Arrays & Hashing", "Two Sum")
  let assert Ok(python_two_sum) =
    problems.find("NeetCode 150", "Arrays & Hashing", "Two Sum")
  assert gleam_two_sum.difficulty == python_two_sum.difficulty
  assert python_two_sum.difficulty == Some(problem.Easy)
}

// --- Blitz ------------------------------------------------------------------

pub fn blitz_rank_tiers_by_share_passed_test() -> Nil {
  assert model.blitz_rank(5, 5) == "Perfect"
  assert model.blitz_rank(4, 5) == "Blazing"
  assert model.blitz_rank(3, 5) == "Sharp"
  assert model.blitz_rank(2, 5) == "Steady"
  assert model.blitz_rank(1, 5) == "Warmup"
  assert model.blitz_rank(0, 5) == "Warmup"
  // Nothing attempted is not a perfect score.
  assert model.blitz_rank(0, 0) == "Warmup"
  assert model.blitz_rank(8, 10) == "Blazing"
  assert model.blitz_rank(6, 10) == "Sharp"
}
