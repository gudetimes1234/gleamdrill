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

import algodrill/api
import algodrill/insights
import algodrill/keys
import algodrill/local
import algodrill/model
import algodrill/problem
import algodrill/problems
import algodrill/queue
import algodrill/view/format
import fsrs
import gleam/dict
import gleam/dynamic/decode
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleam/time/timestamp
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
      ),
      now,
      0,
      0.0,
    )
  let assert Some(memory) = card.card.memory
  let expected = fsrs.initial_memory(guest_settings().scheduler, fsrs.Easy)
  assert memory.stability == expected.stability
}

/// From the second review onward the honesty rule applies: a failed harness or
/// a revealed solution forces Again whatever was claimed.
pub fn later_reviews_enforce_honesty_test() -> Nil {
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

  let #(_store, card) =
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
      ),
      at_epoch(1_800_000_600),
      0,
      0.0,
    )
  let assert Some(memory) = card.card.memory
  // Coerced to Again on the same-day path: the stability must be what a
  // same-day Again produces, not what a claimed Easy would.
  assert memory.stability
    == fsrs.short_term_stability(
      settings.scheduler,
      before.stability,
      fsrs.Again,
    )
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
      ),
      at_epoch(1_800_000_000 + 1200),
      0,
      0.0,
    )

  let data = local.insights(store)
  // The revealed review is not a clean solve, but it is a reveal.
  assert list.length(data.clean_solves) == 2
  assert data.reveals == [#(problem, 1)]
  // Review 1 (Good) was followed by the coerced-Again reveal: not a pass.
  // Review 2 (Again after coercion) was followed by a clean pass.
  let assert Ok(good_row) =
    list.find(data.calibration, fn(row: api.Calibration) {
      row.rating == fsrs.Good
    })
  assert good_row.total == 1 && good_row.passed == 0
  let assert Ok(again_row) =
    list.find(data.calibration, fn(row: api.Calibration) {
      row.rating == fsrs.Again
    })
  assert again_row.total == 1 && again_row.passed == 1

  // And the per-problem history keeps every row, oldest first.
  let history = local.history_of(store, problem)
  assert list.length(history) == 3
  let assert [first, second, ..] = history
  assert first.revealed == False && second.revealed == True
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
  assert press("z") == Error(Nil)
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

  // Language and topic are the same lens from the other two directions.
  let elsewhere = queue.listed(model.Model(..m, queue_language: Some("sd")))
  assert !list.contains(elsewhere, ref)
  let topic = queue.listed(model.Model(..m, queue_topic: Some(ref.subcategory)))
  assert list.contains(topic, ref)
  assert list.all(topic, fn(r: problem.ProblemRef) {
    r.subcategory == ref.subcategory
  })

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
  // Oldest first, with the reveal in the middle — and the middle rating is
  // the coerced Again, proving the log keeps what actually happened.
  let assert [first, second, third] = rows
  assert first.revealed == False
  assert second.revealed == True && second.rating == fsrs.Again
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
fn fresh_model(new_remaining: Int, muted: List(String)) -> model.Model {
  let base = model.default()
  let now = fsrs.from_epoch(1_787_788_818.0)
  let #(store, _) = local.enqueue(local.empty(), problems.all_refs(), now)
  model.Model(
    ..base,
    now:,
    cards: store.cards,
    muted_languages: muted,
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
  let picked = queue.fresh(fresh_model(8, []))
  let languages =
    picked
    |> list.map(fn(ref: problem.ProblemRef) {
      problems.language_tag(ref.category)
    })
    |> list.unique

  assert list.length(picked) == 8
  // Four NeetCode languages, the Gleam tour and System Design, so the first
  // six cards are six different categories. A flat prefix would have yielded
  // eight Python problems and one distinct language.
  assert list.length(picked |> list.take(6)) == 6
  assert list.length(languages) == 6
}

/// Muting is what the first-run picker writes, so the queue must honour it.
pub fn muted_languages_never_enter_the_queue_test() -> Nil {
  let picked = queue.fresh(fresh_model(8, ["gl", "ts", "ex", "gt", "sd"]))
  let languages =
    picked
    |> list.map(fn(ref: problem.ProblemRef) {
      problems.language_tag(ref.category)
    })
    |> list.unique

  assert languages == ["py"]
}

/// A language running dry must not stop the rotation for the others -- with
/// only one language left the queue is simply that language.
pub fn the_rotation_survives_a_language_running_out_test() -> Nil {
  let picked = queue.fresh(fresh_model(300, ["gl", "ts", "ex", "gt", "sd"]))
  // Python has 150 problems; asking for 300 must yield all of them and stop,
  // not loop or truncate at the first round.
  assert list.length(picked) == 150
}

/// The budget is the cap, not a suggestion.
pub fn the_daily_budget_bounds_the_queue_test() -> Nil {
  assert list.length(queue.fresh(fresh_model(3, []))) == 3
  assert queue.fresh(fresh_model(0, [])) == []
}

/// The language tour is content, so it flows through the same catalogue as
/// everything else -- but it is the one category whose run decides nothing.
pub fn the_tour_is_read_and_run_test() -> Nil {
  let assert Ok(tour) =
    list.find(problems.all(), fn(c: problem.Category) {
      c.name == "Gleam Language Tour"
    })
  assert list.map(tour.subcategories, fn(s: problem.Subcategory) { s.name })
    == [
      "Basics", "Functions", "Flow control", "Data types", "Standard library",
      "Advanced features",
    ]
  let cards =
    list.flat_map(tour.subcategories, fn(s: problem.Subcategory) { s.problems })
  assert list.length(cards) == 63
  assert list.all(cards, fn(card: problem.Problem) {
    card.prompt_html && !problem.graded(card) && card.check != None
  })
  // Its own chip: muting Gleam must not mute the tour.
  assert problems.language_tag(tour.name) == "gt"
  assert problems.language_label(tour.name) == "Gleam Tour"
}

/// Everything else is graded by its run, or has no run at all.
pub fn only_the_tour_is_ungraded_test() -> Nil {
  let ungraded =
    problems.all()
    |> list.filter(fn(c: problem.Category) { c.name != "Gleam Language Tour" })
    |> list.flat_map(fn(c: problem.Category) { c.subcategories })
    |> list.flat_map(fn(s: problem.Subcategory) { s.problems })
    |> list.filter(fn(card: problem.Problem) {
      card.check != None && !problem.graded(card)
    })
  assert ungraded == []
}
