//// The backend's pure surface, so CI has something to run that does not need
//// Postgres. Everything requiring a connection is covered by `test/smoke.sh`
//// against a live server; this file is the half that a unit runner can reach.

import fsrs
import gleam/http
import gleam/option.{None, Some}
import gleeunit
import gleeunit/should
import server/auth
import server/study
import server/web
import wisp
import wisp/simulate

pub fn main() {
  gleeunit.main()
}

// --- study.state_code / state_step -----------------------------------------
//
// These are duplicated verbatim in the browser (src/algodrill/api.gleam) and
// are what a card's persisted `state`/`step` columns mean. Pinning them here
// means the planned shared `wire` package has a spec to move against.

pub fn state_code_covers_every_state_test() {
  study.state_code(fsrs.Learning(0)) |> should.equal(1)
  study.state_code(fsrs.Review) |> should.equal(2)
  study.state_code(fsrs.Relearning(0)) |> should.equal(3)
}

pub fn state_step_is_present_only_while_stepping_test() {
  study.state_step(fsrs.Learning(2)) |> should.equal(Some(2))
  study.state_step(fsrs.Relearning(1)) |> should.equal(Some(1))
  study.state_step(fsrs.Review) |> should.equal(None)
}

// --- study.streak ----------------------------------------------------------

pub fn streak_counts_consecutive_days_ending_today_test() {
  [tally(0), tally(1), tally(2)]
  |> study.streak
  |> should.equal(3)
}

/// Not having sat down yet today must not read as a broken streak.
pub fn streak_tolerates_a_day_that_has_not_started_test() {
  [tally(1), tally(2), tally(3)]
  |> study.streak
  |> should.equal(3)
}

pub fn streak_stops_at_the_first_gap_test() {
  [tally(0), tally(1), tally(3), tally(4)]
  |> study.streak
  |> should.equal(2)
}

/// A gap at both 0 and 1 means the streak is over, however much history sits
/// behind it.
pub fn streak_is_zero_when_the_run_does_not_reach_today_test() {
  [tally(2), tally(3), tally(4)]
  |> study.streak
  |> should.equal(0)
}

pub fn streak_of_no_history_is_zero_test() {
  [] |> study.streak |> should.equal(0)
}

/// `stats` feeds this straight from a SQL `group by`, whose row order is not
/// guaranteed.
pub fn streak_does_not_depend_on_row_order_test() {
  [tally(2), tally(0), tally(1)]
  |> study.streak
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

// --- study.default_settings ------------------------------------------------

/// The client ships its own copy of these (src/algodrill/api.gleam). They are
/// meant to be identical, and are checked here so the two cannot part company
/// unnoticed before the shared `wire` package lands.
pub fn default_settings_are_the_documented_values_test() {
  let settings = study.default_settings()
  settings.new_per_day |> should.equal(10)
  settings.reviews_per_day |> should.equal(100)
  settings.day_start_hour |> should.equal(4)
  settings.timezone |> should.equal("UTC")
}

// --- helpers ---------------------------------------------------------------

fn tally(days_ago: Int) -> study.DayTally {
  study.DayTally(days_ago:, total: 1, correct: 1)
}

fn authorized(value: String) -> wisp.Request {
  simulate.request(http.Get, "/api/state")
  |> simulate.header("authorization", value)
}
