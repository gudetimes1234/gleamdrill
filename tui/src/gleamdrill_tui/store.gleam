//// Where study data lives, in either mode, as the web app has it: a guest's
//// in a file on this machine (the web keeps it in localStorage), an
//// account's on the server, reached with the same bearer token the web uses.
////
//// The guest file is an export archive (`wire.archive_to_json`), so it opens
//// in the web app's import as it is, and a web export drops in as the file.

import gleam/dynamic/decode.{type Decoder}
import gleam/int
import gleam/javascript/promise.{type Promise}
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/domain/guest
import gleamdrill/platform/browser
import gleamdrill_tui/sys
import wire.{type ProblemRef, type Settings}

// --- the guest file ---------------------------------------------------------------

/// A guest's whole store, every track, and the settings it schedules under.
pub type Guest {
  Guest(
    local: guest.Local,
    account: wire.AccountSettings,
    tracks: List(#(String, Settings)),
  )
}

pub fn guest_file() -> String {
  sys.data_dir() <> "/guest.json"
}

/// An empty store when there is no file yet; an error when there is one that
/// doesn't read, so a bad file is never silently replaced by an empty one.
pub fn load_guest() -> Result(Guest, String) {
  case sys.read_file(guest_file()) {
    Error(Nil) -> Ok(Guest(guest.empty(), wire.default_account(), []))
    Ok(text) ->
      decode_guest(text)
      |> result.replace_error(
        guest_file() <> " doesn't read as a GleamDrill export; move it aside",
      )
  }
}

pub fn save_guest(store: Guest, now: Timestamp) -> Result(Nil, String) {
  sys.write_file(guest_file(), encode_guest(store, now))
}

pub fn encode_guest(store: Guest, now: Timestamp) -> String {
  guest.archive(store.local, store.account, store.tracks, now)
  |> wire.archive_to_json
  |> json.to_string
}

pub fn decode_guest(text: String) -> Result(Guest, Nil) {
  case json.parse(text, wire.archive_decoder()) {
    Ok(archive) ->
      Ok(Guest(
        guest.restore(archive),
        archive.account,
        guest.archive_tracks(archive),
      ))
    Error(_) -> Error(Nil)
  }
}

pub fn settings_for(store: Guest, track: String) -> Settings {
  list.key_find(store.tracks, track)
  |> result.unwrap(wire.default_settings())
}

/// Today as the study day the guest's rollover hour says it is.
pub fn study_day(account: wire.AccountSettings) -> guest.StudyDay {
  guest.StudyDay(
    start: browser.study_day_start(account.day_start_hour),
    index: browser.study_day_index(account.day_start_hour),
  )
}

// --- the account ------------------------------------------------------------------

pub type ApiError {
  /// The token is missing, wrong or has expired: sign in again.
  Unauthorised
  Failed(String)
}

pub fn error_text(error: ApiError) -> String {
  case error {
    Unauthorised -> "signed out: sign in again from settings (window 5)"
    Failed(text) -> text
  }
}

/// The server, by `GLEAMDRILL_API`, else the live one.
pub fn api_base() -> String {
  sys.env("GLEAMDRILL_API")
  |> result.unwrap("https://gleamdrill.com")
  |> fn(base) {
    case string.ends_with(base, "/") {
      True -> string.drop_end(base, 1)
      False -> base
    }
  }
}

fn token_file() -> String {
  sys.config_dir() <> "/token"
}

pub fn load_token() -> Option(String) {
  sys.read_file(token_file())
  |> result.map(string.trim)
  |> result.try(fn(token) {
    case token {
      "" -> Error(Nil)
      _ -> Ok(token)
    }
  })
  |> option.from_result
}

pub fn save_token(token: String) -> Result(Nil, String) {
  sys.write_file(token_file(), token <> "\n")
}

pub fn clear_token() -> Nil {
  sys.remove_file(token_file())
}

/// The last track open, kept between runs.
pub fn load_track() -> Option(String) {
  sys.read_file(sys.config_dir() <> "/track")
  |> result.map(string.trim)
  |> option.from_result
}

pub fn save_track(track: String) -> Nil {
  let _ = sys.write_file(sys.config_dir() <> "/track", track <> "\n")
  Nil
}

fn scoped(path: String, track: String) -> String {
  path <> "?track=" <> browser.uri_encode(track)
}

fn call(
  method: String,
  path: String,
  token: String,
  body: Option(Json),
  decoder: Decoder(a),
) -> Promise(Result(a, ApiError)) {
  let body = option.map(body, json.to_string) |> option.unwrap("")
  use #(status, text) <- promise.map(sys.request(
    method,
    api_base() <> path,
    token,
    body,
  ))
  case status {
    0 -> Error(Failed("can't reach " <> api_base() <> ": " <> text))
    401 -> Error(Unauthorised)
    // A 204 has no body; `null` is what a `decode.success` reads.
    _ if status >= 200 && status < 300 ->
      json.parse(
        case text {
          "" -> "null"
          _ -> text
        },
        decoder,
      )
      |> result.map_error(fn(_) {
        Failed("the server sent something this version can't read")
      })
    _ -> Error(Failed(server_message(status, text)))
  }
}

fn server_message(status: Int, body: String) -> String {
  let message = {
    use message <- decode.field("message", decode.string)
    decode.success(message)
  }
  case json.parse(body, message) {
    Ok(text) -> text
    Error(_) -> "the server answered " <> int.to_string(status)
  }
}

pub fn login(
  email: String,
  password: String,
) -> Promise(Result(wire.Session, ApiError)) {
  call(
    "POST",
    "/api/auth/login",
    "",
    Some(
      json.object([
        #("email", json.string(email)),
        #("password", json.string(password)),
      ]),
    ),
    wire.session_decoder(),
  )
}

pub fn logout(token: String) -> Promise(Nil) {
  use _ <- promise.map(sys.request(
    "POST",
    api_base() <> "/api/auth/logout",
    token,
    "",
  ))
  Nil
}

pub fn state(
  token: String,
  track: String,
) -> Promise(Result(wire.BootState, ApiError)) {
  call(
    "GET",
    scoped("/api/state", track),
    token,
    None,
    wire.boot_state_decoder(),
  )
}

pub fn review(
  token: String,
  review: wire.Review,
) -> Promise(Result(wire.ReviewOutcome, ApiError)) {
  call(
    "POST",
    "/api/reviews",
    token,
    Some(wire.review_to_json(review)),
    wire.review_outcome_decoder(),
  )
}

pub fn add_cards(
  token: String,
  problems: List(ProblemRef),
) -> Promise(Result(wire.QueueChange, ApiError)) {
  call(
    "POST",
    "/api/cards",
    token,
    Some(problems_json(problems)),
    wire.queue_change_decoder(),
  )
}

pub fn remove_cards(
  token: String,
  problems: List(ProblemRef),
) -> Promise(Result(wire.QueueChange, ApiError)) {
  call(
    "DELETE",
    "/api/cards",
    token,
    Some(problems_json(problems)),
    wire.queue_change_decoder(),
  )
}

fn problems_json(problems: List(ProblemRef)) -> Json {
  json.object([#("problems", json.array(problems, wire.ref_to_json))])
}

pub fn put_draft(
  token: String,
  problem: ProblemRef,
  body: String,
) -> Promise(Result(Nil, ApiError)) {
  call(
    "PUT",
    "/api/drafts",
    token,
    Some(json.object(
      wire.ref_fields(problem) |> list.append([#("body", json.string(body))]),
    )),
    decode.success(Nil),
  )
}

pub fn stats(
  token: String,
  track: String,
) -> Promise(Result(wire.Stats, ApiError)) {
  call("GET", scoped("/api/stats", track), token, None, wire.stats_decoder())
}

pub fn run(
  token: String,
  request: wire.RunRequest,
) -> Promise(Result(wire.RunResult, ApiError)) {
  call(
    "POST",
    "/api/run",
    token,
    Some(wire.run_request_to_json(request)),
    wire.run_result_decoder(),
  )
}
