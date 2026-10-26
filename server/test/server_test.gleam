//// The backend's pure surface, so CI has something to run that does not need
//// Postgres. Everything requiring a connection is covered by `test/smoke.sh`
//// against a live server; this file is the half that a unit runner can reach.

import fsrs
import gleam/http
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleeunit
import gleeunit/should
import server/auth
import server/config
import server/exec
import server/reminders
import server/study/model
import server/study/profile
import server/study/queues
import server/study/reviews
import server/study/stats
import server/study/today
import server/study/track
import server/study/validate
import server/web
import wire
import wisp
import wisp/simulate
import youid/uuid

pub fn main() {
  gleeunit.main()
}

// --- queues.validate_queues --------------------------------------------------

/// The same checks guard a PUT and an archive: names present, short and
/// distinct, and nothing unbounded.
pub fn validate_queues_test() {
  let ref = wire.ProblemRef("NeetCode 150", "Two Pointers", "3Sum")
  let good = [a_queue("Pointers", [ref, ref]), a_queue("Later", [])]
  assert queues.validate_queues(good) == Ok(Nil)
  assert queues.validate_queues([]) == Ok(Nil)
  assert queues.validate_queues([a_queue("  ", [])])
    == Error("a queue needs a name")
  assert queues.validate_queues([a_queue("A", []), a_queue("A", [])])
    == Error("queue names must be distinct within a track")
  // The same name in two tracks is two lists, which is the whole point of a
  // queue living inside one.
  assert queues.validate_queues([
      wire.Queue(track: "NeetCode 150", name: "A", problems: []),
      wire.Queue(track: "NeetCode 150 (Go)", name: "A", problems: []),
    ])
    == Ok(Nil)
  assert queues.validate_queues([a_queue(string.repeat("x", 61), [])])
    == Error("a queue name is at most 60 characters")
  let many =
    list.map(list_range(1, 51), fn(i) { a_queue(int.to_string(i), []) })
  assert queues.validate_queues(many) == Error("at most 50 queues")
  let stuffed = [a_queue("big", list.repeat(ref, 1501))]
  assert queues.validate_queues(stuffed)
    == Error("a queue holds at most 1500 problems")
}

/// Queue names are unique within one track, so every fixture here shares one.
fn a_queue(name: String, problems: List(wire.ProblemRef)) -> wire.Queue {
  wire.Queue(track: "NeetCode 150", name:, problems:)
}

fn list_range(from: Int, to: Int) -> List(Int) {
  case from > to {
    True -> []
    False -> [from, ..list_range(from + 1, to)]
  }
}

// --- wire.state_code / state_step -------------------------------------------
//
// What a card's persisted `state`/`step` columns mean. The browser reads the
// same functions out of the shared `wire` package.

pub fn state_code_covers_every_state_test() {
  wire.state_code(fsrs.Learning(0)) |> should.equal(1)
  wire.state_code(fsrs.Review) |> should.equal(2)
  wire.state_code(fsrs.Relearning(0)) |> should.equal(3)
}

pub fn state_step_is_present_only_while_stepping_test() {
  wire.state_step(fsrs.Learning(2)) |> should.equal(Some(2))
  wire.state_step(fsrs.Relearning(1)) |> should.equal(Some(1))
  wire.state_step(fsrs.Review) |> should.equal(None)
}

// --- stats.streak ----------------------------------------------------------

pub fn streak_counts_consecutive_days_ending_today_test() {
  [tally(0), tally(1), tally(2)]
  |> stats.streak
  |> should.equal(3)
}

/// Not having sat down yet today must not read as a broken streak.
pub fn streak_tolerates_a_day_that_has_not_started_test() {
  [tally(1), tally(2), tally(3)]
  |> stats.streak
  |> should.equal(3)
}

pub fn streak_stops_at_the_first_gap_test() {
  [tally(0), tally(1), tally(3), tally(4)]
  |> stats.streak
  |> should.equal(2)
}

/// A gap at both 0 and 1 means the streak is over, however much history sits
/// behind it.
pub fn streak_is_zero_when_the_run_does_not_reach_today_test() {
  [tally(2), tally(3), tally(4)]
  |> stats.streak
  |> should.equal(0)
}

pub fn streak_of_no_history_is_zero_test() {
  [] |> stats.streak |> should.equal(0)
}

/// `stats` feeds this straight from a SQL `group by`, whose row order is not
/// guaranteed.
pub fn streak_does_not_depend_on_row_order_test() {
  [tally(2), tally(0), tally(1)]
  |> stats.streak
  |> should.equal(3)
}

// --- web.bearer_token ------------------------------------------------------

pub fn bearer_token_reads_a_well_formed_header_test() {
  authorized("Bearer abc123")
  |> web.bearer_token
  |> should.equal(Ok("abc123"))
}

/// The scheme is case-insensitive per RFC 7235; the token is not.
pub fn bearer_token_accepts_any_case_of_scheme_test() {
  authorized("bearer abc123") |> web.bearer_token |> should.equal(Ok("abc123"))
  authorized("BEARER abc123") |> web.bearer_token |> should.equal(Ok("abc123"))
}

pub fn bearer_token_rejects_malformed_headers_test() {
  authorized("Basic abc123") |> web.bearer_token |> should.equal(Error(Nil))
  authorized("Bearer") |> web.bearer_token |> should.equal(Error(Nil))
  authorized("Bearer ") |> web.bearer_token |> should.equal(Error(Nil))
  authorized("Bearer a b") |> web.bearer_token |> should.equal(Error(Nil))
  authorized("abc123") |> web.bearer_token |> should.equal(Error(Nil))
}

pub fn bearer_token_absent_header_is_an_error_test() {
  simulate.request(http.Get, "/api/state")
  |> web.bearer_token
  |> should.equal(Error(Nil))
}

// --- web.client_ip ---------------------------------------------------------
//
// Only ever used to key login throttling, but if it collapsed to a constant
// every attacker would share one bucket with every honest user.

pub fn client_ip_prefers_the_fly_header_test() {
  simulate.request(http.Post, "/api/auth/login")
  |> simulate.header("fly-client-ip", "203.0.113.7")
  |> simulate.header("x-forwarded-for", "198.51.100.1")
  |> web.client_ip
  |> should.equal("203.0.113.7")
}

/// Only the first entry of `x-forwarded-for` is trustworthy; the rest are
/// appended by whatever sat in between.
pub fn client_ip_takes_the_first_forwarded_entry_test() {
  simulate.request(http.Post, "/api/auth/login")
  |> simulate.header("x-forwarded-for", "198.51.100.1, 10.0.0.1, 10.0.0.2")
  |> web.client_ip
  |> should.equal("198.51.100.1")
}

pub fn client_ip_falls_back_when_nothing_identifies_the_caller_test() {
  simulate.request(http.Post, "/api/auth/login")
  |> web.client_ip
  |> should.equal("unknown")
}

// --- auth.normalise_email --------------------------------------------------
//
// Signup and login must agree on this or an account becomes unreachable by the
// address that created it.

pub fn normalise_email_trims_and_lowercases_test() {
  auth.normalise_email("  Charles@Example.COM  ")
  |> should.equal("charles@example.com")
}

pub fn normalise_email_is_idempotent_test() {
  let once = auth.normalise_email(" A@B.io ")
  auth.normalise_email(once) |> should.equal(once)
}

// --- default settings --------------------------------------------------------

/// The defaults live in `wire`, which the client compiles too. Pinned here so
/// a change to them is a decision rather than an accident.
pub fn default_settings_are_the_documented_values_test() {
  let settings = profile.default_settings()
  settings.new_per_day |> should.equal(5)
  settings.reviews_per_day |> should.equal(100)
}

/// The knobs about the person rather than about what they study. Split from
/// the scheduler's in the same change that made settings per track: one
/// rollover hour, one timezone, one reminder, whatever you are drilling.
pub fn default_account_settings_are_the_documented_values_test() {
  let account = profile.default_profile().account
  account.day_start_hour |> should.equal(4)
  account.timezone |> should.equal("UTC")
  account.reminder_hour |> should.equal(None)
}

// --- helpers ---------------------------------------------------------------

fn tally(days_ago: Int) -> wire.DayTally {
  wire.DayTally(days_ago:, total: 1, correct: 1)
}

fn authorized(value: String) -> wisp.Request {
  simulate.request(http.Get, "/api/state")
  |> simulate.header("authorization", value)
}

// --- reminders --------------------------------------------------------------
//
// The mail itself is two pure functions; the loop around them is I/O.

pub fn reminder_subject_counts_correctly_test() {
  reminders.subject(1) |> should.equal("1 problem is due on GleamDrill")
  reminders.subject(12) |> should.equal("12 problems are due on GleamDrill")
}

pub fn reminder_body_links_the_app_and_the_way_out_test() {
  let text = reminders.body(3, "https://gleamdrill.example")
  assert string.contains(text, "3 problems due today")
  assert string.contains(text, "https://gleamdrill.example")
  assert string.contains(text, "Settings > Reminders")
  assert string.contains(reminders.body(1, "x"), "one problem due today")
}

// --- exec: server-side Elixir runs ------------------------------------------
//
// These need `elixir` on the PATH (CI installs it for the Argon2 NIF anyway)
// and run attempts as the test's own user: config.run_as_user is None, the
// way a developer machine runs them. The uid boundary is the container's and
// is checked by hand there; what is checked here is that the report the
// script prints comes back as the RunResult the app expects, in every shape.

fn exec_config() -> config.Config {
  config.Config(
    port: 0,
    bind: "127.0.0.1",
    database_url: "",
    secret_key_base: "",
    allowed_origins: [],
    session_days: 1,
    run_as_user: None,
    resend_api_key: None,
    reminder_from: "GleamDrill <reminders@example.com>",
    app_url: "https://gleamdrill.example",
  )
}

const harness = "[
  {\"contains_duplicate?([1, 2, 3, 1])\", inspect(true), inspect(Solution.contains_duplicate?([1, 2, 3, 1]))},
  {\"contains_duplicate?([1, 2, 3, 4])\", inspect(false), inspect(Solution.contains_duplicate?([1, 2, 3, 4]))}
]"

pub fn a_passing_attempt_reports_its_cases_test() {
  let result =
    exec.run_elixir(
      exec_config(),
      "defmodule Solution do
  def contains_duplicate?(nums), do: MapSet.size(MapSet.new(nums)) != length(nums)
end
",
      harness,
    )
  result.error |> should.equal(None)
  result.stdout |> should.equal("")
  result.cases
  |> should.equal([
    wire.CaseResult("contains_duplicate?([1, 2, 3, 1])", "true", "true", True),
    wire.CaseResult("contains_duplicate?([1, 2, 3, 4])", "false", "false", True),
  ])
}

pub fn a_failing_attempt_keeps_its_output_test() {
  let result =
    exec.run_elixir(
      exec_config(),
      "defmodule Solution do
  def contains_duplicate?(nums) do
    IO.puts(\"checking\")
    length(nums) > 3
  end
end
",
      harness,
    )
  result.error |> should.equal(None)
  result.stdout |> should.equal("checking\nchecking\n")
  result.cases
  |> list.map(fn(c) { c.passed })
  |> should.equal([True, False])
}

pub fn a_syntax_error_is_a_compile_error_with_a_line_test() {
  let result =
    exec.run_elixir(
      exec_config(),
      "defmodule Solution do
  def contains_duplicate?(nums) do
    x =
  end
end
",
      harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("compile")
  error.line |> should.equal(Some(4))
}

pub fn a_crash_is_a_run_error_test() {
  let result =
    exec.run_elixir(
      exec_config(),
      "defmodule Solution do
  def contains_duplicate?(_nums), do: hd([])
end
",
      harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  string.contains(error.message, "not a nonempty list") |> should.be_true
}

// --- exec: Go ---------------------------------------------------------------
//
// The same shapes for Go, which needs `go` on the PATH. The harness is the
// one drills/go/harnesses/nc01_contains_duplicate.go carries; the prelude it
// calls into is staged from server/priv/go by exec itself.

const go_harness = "package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(\"containsDuplicate([1, 2, 3, 1])\", true, containsDuplicate([]int{1, 2, 3, 1})),
			tc(\"containsDuplicate([1, 2, 3, 4])\", false, containsDuplicate([]int{1, 2, 3, 4})),
		}
	})
}
"

pub fn a_passing_go_attempt_reports_its_cases_test() {
  let result =
    exec.run_go(
      exec_config(),
      "package main

func containsDuplicate(nums []int) bool {
	seen := map[int]bool{}
	for _, n := range nums {
		if seen[n] {
			return true
		}
		seen[n] = true
	}
	return false
}
",
      go_harness,
    )
  result.error |> should.equal(None)
  result.stdout |> should.equal("")
  result.cases
  |> should.equal([
    wire.CaseResult("containsDuplicate([1, 2, 3, 1])", "true", "true", True),
    wire.CaseResult("containsDuplicate([1, 2, 3, 4])", "false", "false", True),
  ])
}

pub fn a_failing_go_attempt_keeps_its_output_test() {
  let result =
    exec.run_go(
      exec_config(),
      "package main

import \"fmt\"

func containsDuplicate(nums []int) bool {
	fmt.Println(\"checking\")
	return len(nums) > 3
}
",
      go_harness,
    )
  result.error |> should.equal(None)
  result.stdout |> should.equal("checking\nchecking\n")
  result.cases
  |> list.map(fn(c) { c.passed })
  |> should.equal([True, False])
}

pub fn a_go_build_error_is_a_compile_error_with_a_line_test() {
  let result =
    exec.run_go(
      exec_config(),
      "package main

func containsDuplicate(nums []int) bool {
	return undefinedThing
}
",
      go_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("compile")
  error.line |> should.equal(Some(4))
  string.contains(error.message, "undefined: undefinedThing") |> should.be_true
}

pub fn a_go_panic_is_a_run_error_with_a_line_test() {
  let result =
    exec.run_go(
      exec_config(),
      "package main

func containsDuplicate(nums []int) bool {
	var empty []int
	return empty[3] == 0
}
",
      go_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  error.line |> should.equal(Some(5))
  string.contains(error.message, "index out of range") |> should.be_true
}

pub fn a_go_infinite_loop_is_killed_and_reported_test() {
  let result =
    exec.run_go(
      exec_config(),
      "package main

func containsDuplicate(nums []int) bool {
	for {
	}
}
",
      go_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  string.contains(error.message, "Timed out") |> should.be_true
}

// --- exec: Haskell ----------------------------------------------------------
//
// The same shapes for Haskell, which needs `ghc` on the PATH. The harness is
// the one drills/haskell/harnesses/nc01_contains_duplicate.hs carries; the
// Drill prelude it imports is staged from server/priv/haskell by exec itself.

const haskell_harness = "module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc \"containsDuplicate [1, 2, 3, 1]\" True (containsDuplicate [1, 2, 3, 1])
       , tc \"containsDuplicate [1, 2, 3, 4]\" False (containsDuplicate [1, 2, 3, 4])
       ])
"

pub fn a_passing_haskell_attempt_reports_its_cases_test() {
  let result =
    exec.run_haskell(
      exec_config(),
      "module Solution where

import Data.List (nub)

containsDuplicate :: [Int] -> Bool
containsDuplicate nums = length (nub nums) /= length nums
",
      haskell_harness,
    )
  result.error |> should.equal(None)
  result.stdout |> should.equal("")
  result.cases
  |> should.equal([
    wire.CaseResult("containsDuplicate [1, 2, 3, 1]", "True", "True", True),
    wire.CaseResult("containsDuplicate [1, 2, 3, 4]", "False", "False", True),
  ])
}

pub fn a_failing_haskell_attempt_keeps_its_output_test() {
  let result =
    exec.run_haskell(
      exec_config(),
      "module Solution where

import Debug.Trace (trace)

containsDuplicate :: [Int] -> Bool
containsDuplicate nums = trace \"checking\" (length nums > 3)
",
      haskell_harness,
    )
  result.error |> should.equal(None)
  // Debug.Trace writes to stderr, so stdout stays empty; the point is the
  // verdicts, which the trace must not corrupt.
  result.cases
  |> list.map(fn(c) { c.passed })
  |> should.equal([True, False])
}

pub fn a_haskell_build_error_is_a_compile_error_with_a_line_test() {
  let result =
    exec.run_haskell(
      exec_config(),
      "module Solution where

containsDuplicate :: [Int] -> Bool
containsDuplicate nums = undefinedThing
",
      haskell_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("compile")
  error.line |> should.equal(Some(4))
  string.contains(error.message, "undefinedThing") |> should.be_true
}

pub fn a_haskell_error_call_is_a_run_error_with_a_line_test() {
  let result =
    exec.run_haskell(
      exec_config(),
      "module Solution where

containsDuplicate :: [Int] -> Bool
containsDuplicate _ = error \"boom\"
",
      haskell_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  error.line |> should.equal(Some(4))
  string.contains(error.message, "boom") |> should.be_true
}

pub fn a_haskell_infinite_loop_is_killed_and_reported_test() {
  let result =
    exec.run_haskell(
      exec_config(),
      "module Solution where

containsDuplicate :: [Int] -> Bool
containsDuplicate nums = containsDuplicate nums
",
      haskell_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  string.contains(error.message, "Timed out") |> should.be_true
}

// --- exec: Ruby -------------------------------------------------------------
//
// The same shapes for Ruby, which needs `ruby` on the PATH. The harness is
// the one drills/ruby/harnesses/nc01_contains_duplicate.rb carries; the
// runner it is loaded by is staged from server/priv/ruby by exec itself.

const ruby_harness = "need :contains_duplicate

tc \"contains_duplicate([1, 2, 3, 1])\", true, contains_duplicate([1, 2, 3, 1])
tc \"contains_duplicate([1, 2, 3, 4])\", false, contains_duplicate([1, 2, 3, 4])
"

pub fn a_passing_ruby_attempt_reports_its_cases_test() {
  let result =
    exec.run_ruby(
      exec_config(),
      "def contains_duplicate(nums)
  nums.uniq.length != nums.length
end
",
      ruby_harness,
    )
  result.error |> should.equal(None)
  result.stdout |> should.equal("")
  result.cases
  |> should.equal([
    wire.CaseResult("contains_duplicate([1, 2, 3, 1])", "true", "true", True),
    wire.CaseResult("contains_duplicate([1, 2, 3, 4])", "false", "false", True),
  ])
}

pub fn a_failing_ruby_attempt_keeps_its_output_test() {
  let result =
    exec.run_ruby(
      exec_config(),
      "def contains_duplicate(nums)
  puts \"checking\"
  nums.length > 3
end
",
      ruby_harness,
    )
  result.error |> should.equal(None)
  result.stdout |> should.equal("checking\nchecking\n")
  result.cases
  |> list.map(fn(c) { c.passed })
  |> should.equal([True, False])
}

pub fn a_ruby_syntax_error_is_a_compile_error_with_a_line_test() {
  let result =
    exec.run_ruby(
      exec_config(),
      "def contains_duplicate(nums)
  nums.each do |num|
end
",
      ruby_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("compile")
  error.line |> should.equal(Some(3))
  string.contains(error.message, "SyntaxError") |> should.be_true
}

pub fn a_ruby_raise_is_a_run_error_with_a_line_test() {
  let result =
    exec.run_ruby(
      exec_config(),
      "def contains_duplicate(nums)
  raise NotImplementedError, \"todo\"
end
",
      ruby_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  error.line |> should.equal(Some(2))
  string.contains(error.message, "todo") |> should.be_true
}

pub fn a_ruby_infinite_loop_is_killed_and_reported_test() {
  let result =
    exec.run_ruby(
      exec_config(),
      "def contains_duplicate(nums)
  loop {}
end
",
      ruby_harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  string.contains(error.message, "Timed out") |> should.be_true
}

pub fn an_infinite_loop_is_killed_and_reported_test() {
  let result =
    exec.run_elixir(
      exec_config(),
      "defmodule Solution do
  def contains_duplicate?(_nums), do: Process.sleep(60_000)
end
",
      harness,
    )
  result.cases |> should.equal([])
  let assert Some(error) = result.error
  error.phase |> should.equal("run")
  string.contains(error.message, "Timed out") |> should.be_true
}

// --- reviews.schedule --------------------------------------------------------

fn ref(title: String) -> wire.ProblemRef {
  wire.ProblemRef(category: "Python", subcategory: "Arrays", title:)
}

fn record_for(card: fsrs.Card) -> model.CardRecord {
  let assert Ok(nil_uuid) =
    uuid.from_string("00000000-0000-0000-0000-000000000000")
  model.CardRecord(
    id: nil_uuid,
    problem: ref("Two Sum"),
    card:,
    reps: 0,
    lapses: 0,
    suspended: False,
    introduced_at: None,
  )
}

pub fn a_first_review_schedules_like_fsrs_and_counts_no_days_test() {
  let now = fsrs.from_epoch(1_700_000_000.0)
  let config = fsrs.default_config()
  let existing = record_for(fsrs.new_card(now))
  let #(record, elapsed, scheduled) =
    reviews.schedule(existing, fsrs.Good, now, config, 0.5)
  record.card
  |> should.equal(fsrs.review(existing.card, fsrs.Good, now, config, 0.5))
  record.reps |> should.equal(1)
  record.lapses |> should.equal(0)
  elapsed |> should.equal(0)
  scheduled |> should.equal(0)
}

pub fn a_failed_graduated_card_counts_a_lapse_and_its_days_test() {
  let day = 86_400.0
  let last = fsrs.from_epoch(1_700_000_000.0 -. 10.0 *. day)
  let now = fsrs.from_epoch(1_700_000_000.0)
  let graduated =
    fsrs.Card(
      state: fsrs.Review,
      memory: Some(fsrs.Memory(stability: 5.0, difficulty: 5.0)),
      due: fsrs.from_epoch(1_700_000_000.0 -. 3.0 *. day),
      last_review: Some(last),
    )
  let existing = model.CardRecord(..record_for(graduated), reps: 3, lapses: 1)
  let #(record, elapsed, scheduled) =
    reviews.schedule(existing, fsrs.Again, now, fsrs.default_config(), 0.5)
  record.lapses |> should.equal(2)
  record.reps |> should.equal(4)
  elapsed |> should.equal(10)
  scheduled |> should.equal(7)
}

pub fn a_failure_while_still_learning_is_not_a_lapse_test() {
  let now = fsrs.from_epoch(1_700_000_000.0)
  let existing = record_for(fsrs.new_card(now))
  let #(record, _, _) =
    reviews.schedule(existing, fsrs.Again, now, fsrs.default_config(), 0.5)
  record.lapses |> should.equal(0)
  record.reps |> should.equal(1)
}

// --- model.to_state ----------------------------------------------------------

pub fn a_card_record_crosses_the_wire_without_its_id_test() {
  let now = fsrs.from_epoch(1_700_000_000.0)
  let record =
    model.CardRecord(
      ..record_for(fsrs.new_card(now)),
      reps: 2,
      lapses: 1,
      suspended: True,
      introduced_at: Some(now),
    )
  let state = model.to_state(record)
  state.problem |> should.equal(record.problem)
  state.card |> should.equal(record.card)
  state.reps |> should.equal(2)
  state.lapses |> should.equal(1)
  state.suspended |> should.equal(True)
  state.introduced_at |> should.equal(Some(now))
}

// --- study/track -------------------------------------------------------------

fn standing(track: String, cards: Int) -> wire.TrackStanding {
  wire.TrackStanding(
    track:,
    settings: wire.default_settings(),
    cards:,
    due_now: 0,
    introduced_today: 0,
    reviews_today: 0,
  )
}

pub fn the_named_track_wins_and_most_cards_breaks_the_tie_test() {
  track.pick(Some("Elixir"), [standing("Python", 9)]) |> should.equal("Elixir")
  track.pick(None, [standing("Python", 3), standing("Go", 9)])
  |> should.equal("Go")
  track.pick(None, []) |> should.equal("")
}

pub fn a_batch_must_sit_in_one_track_test() {
  track.batch_track([ref("A"), ref("B")]) |> should.equal(Ok("Python"))
  track.batch_track([
    ref("A"),
    wire.ProblemRef(category: "Go", subcategory: "Arrays", title: "B"),
  ])
  |> should.equal(Error(Nil))
  track.batch_track([]) |> should.equal(Error(Nil))
}

pub fn a_queue_set_must_sit_in_one_track_test() {
  let queue = fn(track) { wire.Queue(track:, name: "q", problems: []) }
  track.one_track([queue("Python"), queue("Python")])
  |> should.equal(Ok("Python"))
  track.one_track([queue("Python"), queue("Go")]) |> should.equal(Error(Nil))
  track.one_track([]) |> should.equal(Error(Nil))
}

// --- study/validate ----------------------------------------------------------

pub fn settings_bounds_guard_the_scheduler_knobs_test() {
  let good = wire.default_settings()
  validate.settings(good) |> should.equal(Ok(good))
  let config = good.scheduler
  validate.settings(
    wire.Settings(
      ..good,
      scheduler: fsrs.Config(..config, desired_retention: 0.69),
    ),
  )
  |> should.be_error
  validate.settings(
    wire.Settings(
      ..good,
      scheduler: fsrs.Config(..config, desired_retention: 0.99),
    ),
  )
  |> should.be_ok
  validate.settings(wire.Settings(..good, new_per_day: -1)) |> should.be_error
  validate.settings(
    wire.Settings(..good, scheduler: fsrs.Config(..config, learning_steps: [0])),
  )
  |> should.be_error
}

pub fn account_bounds_guard_the_day_and_reminder_hours_test() {
  let good = wire.default_account()
  validate.account(good) |> should.equal(Ok(good))
  validate.account(wire.AccountSettings(..good, day_start_hour: 24))
  |> should.be_error
  validate.account(wire.AccountSettings(..good, reminder_hour: Some(-1)))
  |> should.be_error
  validate.account(wire.AccountSettings(..good, reminder_hour: Some(23)))
  |> should.be_ok
}

// --- queues.merge ------------------------------------------------------------

pub fn merging_queues_loses_nothing_and_duplicates_nothing_test() {
  let existing = [
    wire.Queue(track: "Python", name: "warmup", problems: [ref("A"), ref("B")]),
  ]
  let incoming = [
    wire.Queue(track: "Python", name: "warmup", problems: [ref("B"), ref("C")]),
    wire.Queue(track: "", name: "untracked", problems: []),
  ]
  let merged = queues.merge(existing, "Python", incoming)
  merged
  |> should.equal([
    wire.Queue(track: "Python", name: "warmup", problems: [
      ref("A"),
      ref("B"),
      ref("C"),
    ]),
    wire.Queue(track: "Python", name: "untracked", problems: []),
  ])
  // Retrying the upgrade changes nothing: the merge is idempotent.
  queues.merge(merged, "Python", incoming) |> should.equal(merged)
}

pub fn merging_queues_matches_names_the_way_the_insert_stores_them_test() {
  let existing = [
    wire.Queue(track: "Python", name: "warmup", problems: [ref("A")]),
  ]
  let incoming = [
    wire.Queue(track: "Python", name: " warmup ", problems: [ref("B")]),
  ]
  // Compared raw, these were two queues that the trimming insert then wrote
  // under one name -- a unique-index violation, so a 500 on upgrade.
  queues.merge(existing, "Python", incoming)
  |> should.equal([
    wire.Queue(track: "Python", name: "warmup", problems: [ref("A"), ref("B")]),
  ])
}

// --- today.budget ------------------------------------------------------------

pub fn the_day_budgets_subtract_and_clamp_at_zero_test() {
  let settings =
    wire.Settings(
      ..wire.default_settings(),
      new_per_day: 5,
      reviews_per_day: 10,
    )
  let counted = today.budget(settings, 0.0, 86_400.0, 3, 7, 4)
  counted.reviews_remaining |> should.equal(7)
  counted.new_remaining |> should.equal(0)
  counted.due_now |> should.equal(4)
  counted.reviews_done |> should.equal(3)
  counted.day_end |> should.equal(fsrs.from_epoch(86_400.0))
}
