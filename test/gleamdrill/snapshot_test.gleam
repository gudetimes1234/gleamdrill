//// Snapshot tests: every screen rendered from the captured fixtures, and
//// every captured payload re-encoded. A change to what a screen draws, or to
//// the JSON the client and server trade, shows up here as a diff to review
//// rather than slipping through.
////
//// Review and accept changes with `gleam run -m birdie`.

import birdie
import gleam/dynamic/decode
import gleam/json
import gleam/list
import gleam/string
import gleam/uri
import gleamdrill/app
import gleamdrill/content/problems
import gleamdrill/domain/line_drill
import gleamdrill/model
import gleamdrill/msg
import gleamdrill/page/auth/model as auth_model
import gleamdrill/page/sitting/view/line_drill as line_view
import gleamdrill/page/study/model as study_model
import gleamdrill/shared/update as shared_update
import lustre/element
import simplifile
import wire

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

// --- screens ------------------------------------------------------------------

/// The app signed in and loaded from the state fixture, on the study screen.
fn loaded() -> app.State {
  let state = decode("state", wire.boot_state_decoder())
  let signed_in =
    model.Model(..model.default(), mode: model.Account("fixture-token"))
  let #(shared, _) = shared_update.update(signed_in, msg.StateLoaded(Ok(state)))
  app.State(shared:, page: app.Study(study_model.init()), address: "/")
}

/// The screen a run of messages leaves the loaded app on, as HTML.
fn screen(messages: List(msg.Msg)) -> String {
  list.fold(messages, loaded(), fn(state, message) {
    app.update(state, message).0
  })
  |> app.view
  |> element.to_readable_string
}

pub fn study_screen_test() {
  screen([]) |> birdie.snap(title: "screen: study")
}

pub fn tracks_screen_test() {
  screen([msg.UserClickedTracks]) |> birdie.snap(title: "screen: tracks")
}

pub fn browse_screen_test() {
  screen([msg.UserClickedBrowse]) |> birdie.snap(title: "screen: browse")
}

pub fn queue_screen_test() {
  screen([msg.UserClickedQueue]) |> birdie.snap(title: "screen: queue")
}

pub fn stats_screen_test() {
  let stats = decode("stats", wire.stats_decoder())
  let insights = decode("insights", wire.insights_decoder())
  screen([
    msg.UserClickedStats,
    msg.StatsLoaded(Ok(stats)),
    msg.InsightsLoaded(Ok(insights)),
  ])
  |> birdie.snap(title: "screen: stats")
}

pub fn settings_screen_test() {
  let assert Ok(address) = uri.parse("/settings")
  screen([msg.UrlChanged(address)]) |> birdie.snap(title: "screen: settings")
}

pub fn tour_screen_test() {
  screen([msg.UserClickedTour]) |> birdie.snap(title: "screen: tour")
}

pub fn sign_in_screen_test() {
  screen([msg.UserClickedSignIn(auth_model.SigningIn)])
  |> birdie.snap(title: "screen: sign in")
}

pub fn drill_screen_test() {
  screen([msg.UserClickedStudy]) |> birdie.snap(title: "screen: drill")
}

// --- Line Drill ---------------------------------------------------------------

/// The Line Drill panel for a problem after `lines` submissions, then `then`.
fn line_screen(
  subcategory: String,
  title: String,
  lines: List(String),
  then: fn(line_drill.LineState) -> line_drill.LineState,
) -> String {
  let assert Ok(found) = problems.find("NeetCode 150", subcategory, title)
  line_drill.start(found.patterns)
  |> list.fold(lines, _, fn(state, line) { line_drill.submit(state, line).0 })
  |> then
  |> line_view.view(found)
  |> element.to_readable_string
}

fn reverse_screen(lines, then) -> String {
  line_screen("Linked List", "Reverse Linked List", lines, then)
}

fn unchanged(state: line_drill.LineState) -> line_drill.LineState {
  state
}

pub fn line_start_screen_test() {
  reverse_screen([], unchanged) |> birdie.snap(title: "line: start")
}

pub fn line_ambiguous_screen_test() {
  line_screen("Arrays & Hashing", "Two Sum", [], unchanged)
  |> birdie.snap(title: "line: ambiguous")
}

pub fn line_locked_screen_test() {
  reverse_screen(["previous = None", "while head is not None:"], unchanged)
  |> birdie.snap(title: "line: locked")
}

pub fn line_missed_three_times_screen_test() {
  reverse_screen(
    ["previous = None", "for x in head:", "while True:", "loop"],
    fn(state) { line_drill.show_note(state, hint: True) },
  )
  |> birdie.snap(title: "line: missed three times")
}

pub fn line_revealed_screen_test() {
  reverse_screen(["previous = None"], line_drill.reveal_line)
  |> birdie.snap(title: "line: revealed")
}

pub fn line_complete_screen_test() {
  reverse_screen(
    [
      "previous = None",
      "while head is not None:",
      "following = head.next",
      "head.next = previous",
      "previous = head",
      "head = following",
      "return previous",
    ],
    unchanged,
  )
  |> birdie.snap(title: "line: complete")
}

// --- payloads -----------------------------------------------------------------

/// A captured response decoded and encoded again: the JSON the client would
/// send for the same value, so a change to an encoder is a reviewed diff.
fn payload(name: String, decoder, encode) -> String {
  decode(name, decoder) |> encode |> json.to_string
}

pub fn session_payload_test() {
  payload("session", wire.session_decoder(), wire.session_to_json)
  |> birdie.snap(title: "payload: session")
}

pub fn boot_state_payload_test() {
  payload("state", wire.boot_state_decoder(), wire.boot_state_to_json)
  |> birdie.snap(title: "payload: boot state")
}

pub fn review_payload_test() {
  payload("review", wire.review_outcome_decoder(), wire.review_outcome_to_json)
  |> birdie.snap(title: "payload: review outcome")
}

pub fn stats_payload_test() {
  payload("stats", wire.stats_decoder(), wire.stats_to_json)
  |> birdie.snap(title: "payload: stats")
}

pub fn insights_payload_test() {
  payload("insights", wire.insights_decoder(), wire.insights_to_json)
  |> birdie.snap(title: "payload: insights")
}
