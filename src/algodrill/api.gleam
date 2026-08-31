//// The backend client.
////
//// Every call returns a Lustre effect that dispatches one message. Nothing
//// here touches the model; `algodrill.gleam` decides what a result means.
////
//// Card scheduling is deliberately one-directional: the server tells us where
//// a card stands, and we never send it a due date. The one thing computed
//// locally is `fsrs.preview`, for the "3d / 8d / 15d" hints on the grading
//// buttons -- and that runs the same scheduler module the server schedules
//// with, so the hint and the outcome cannot disagree.

import algodrill/problem.{type ProblemRef}
import gleam/dynamic/decode.{type Decoder}
import gleam/http
import gleam/http/request.{type Request}
import gleam/http/response.{type Response}
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import lustre/effect.{type Effect}
import rsvp
import wire

// --- types -----------------------------------------------------------------
//
// The payload types and their codecs live in `wire`, compiled to both targets
// from one source so the server cannot rename a field without breaking this
// build. They are aliased through here because this is where the app has
// always looked for them; the aliases are transparent, so an `api.CardState`
// and a `wire.CardState` are the same type. Building one still goes through
// `wire`, which is the only module that owns the constructors.

pub type User =
  wire.User

pub type Session =
  wire.Session

pub type CardState =
  wire.CardState

pub type Today =
  wire.Today

pub type Settings =
  wire.Settings

pub type BootState =
  wire.BootState

pub type ReviewOutcome =
  wire.ReviewOutcome

pub type DayTally =
  wire.DayTally

pub type Stats =
  wire.Stats

pub type CleanSolve =
  wire.CleanSolve

pub type Calibration =
  wire.Calibration

pub type Insights =
  wire.Insights

pub type ReviewRow =
  wire.ReviewRow

pub type Review =
  wire.Review

/// What the app assumes before the first `/api/state` lands. The server
/// creates new accounts with the same values, from the same definition.
pub fn default_settings() -> Settings {
  wire.default_settings()
}

pub fn empty_today() -> Today {
  wire.empty_today()
}

pub type ApiError {
  /// No session, or it expired. The only error the app reacts to structurally:
  /// it means sign in again.
  Unauthorised
  /// The request was refused for a reason worth showing verbatim -- a taken
  /// email, a password that is too short, too many attempts.
  Rejected(message: String)
  /// The request never reached the server.
  Offline
  ServerFault(message: String)
}

pub fn error_message(error: ApiError) -> String {
  case error {
    Unauthorised -> "Your session has expired. Sign in again."
    Rejected(message) -> message
    Offline -> "Can't reach the server. Check your connection."
    ServerFault(message) -> message
  }
}

// --- requests --------------------------------------------------------------

pub fn signup(
  base: String,
  email: String,
  password: String,
  timezone: String,
  handler: fn(Result(Session, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Post,
    "/api/auth/signup",
    None,
    Some(
      json.object([
        #("email", json.string(email)),
        #("password", json.string(password)),
        #("timezone", json.string(timezone)),
      ]),
    ),
    session_decoder(),
    handler,
  )
}

/// The browser's IANA zone. Without it the account's study day would roll
/// over at 04:00 UTC wherever the user actually is.
pub fn login(
  base: String,
  email: String,
  password: String,
  handler: fn(Result(Session, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Post,
    "/api/auth/login",
    None,
    Some(credentials_json(email, password)),
    session_decoder(),
    handler,
  )
}

/// Logging out is best-effort by design: the client drops its token either
/// way, so a failure here would only leave a row to expire on its own.
pub fn logout(
  base: String,
  token: String,
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  send_expecting_nothing(
    base,
    http.Post,
    "/api/auth/logout",
    Some(token),
    None,
    handler,
  )
}

pub fn fetch_state(
  base: String,
  token: String,
  handler: fn(Result(BootState, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/state",
    Some(token),
    None,
    boot_state_decoder(),
    handler,
  )
}

pub fn post_review(
  base: String,
  token: String,
  review: Review,
  handler: fn(Result(ReviewOutcome, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Post,
    "/api/reviews",
    Some(token),
    Some(wire.review_to_json(review)),
    review_outcome_decoder(),
    handler,
  )
}

/// Parks or resumes one card. Answers the same shape as a review, so callers
/// fold it with the same decoder.
pub fn patch_card(
  base: String,
  token: String,
  problem: ProblemRef,
  suspended: Bool,
  handler: fn(Result(ReviewOutcome, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Patch,
    "/api/cards",
    Some(token),
    Some(json.object(
      wire.ref_fields(problem)
      |> list.append([#("suspended", json.bool(suspended))]),
    )),
    review_outcome_decoder(),
    handler,
  )
}

pub fn put_draft(
  base: String,
  token: String,
  problem: ProblemRef,
  body: String,
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  send_expecting_nothing(
    base,
    http.Put,
    "/api/drafts",
    Some(token),
    Some(json.object(
      wire.ref_fields(problem) |> list.append([#("body", json.string(body))]),
    )),
    handler,
  )
}

pub fn put_settings(
  base: String,
  token: String,
  settings: Settings,
  handler: fn(Result(Settings, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Put,
    "/api/settings",
    Some(token),
    Some(settings_json(settings)),
    decode.at(["settings"], settings_decoder()),
    handler,
  )
}

/// Hands the pre-account localStorage state to the server, once.
///
/// Solved problems are seeded as cards rather than replayed as reviews: the
/// old format stored a sticky boolean and no dates at all, so inventing a
/// review history from it would poison the data the FSRS optimizer will later
/// learn from.
pub fn import_legacy(
  base: String,
  token: String,
  solved: List(ProblemRef),
  cards: List(CardState),
  drafts: List(#(ProblemRef, String)),
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  send_expecting_nothing(
    base,
    http.Post,
    "/api/import",
    Some(token),
    Some(
      json.object([
        #(
          "solved",
          json.array(solved, fn(problem) {
            json.object(wire.ref_fields(problem))
          }),
        ),
        #("cards", json.array(cards, card_json)),
        #(
          "drafts",
          json.array(drafts, fn(entry) {
            json.object(
              wire.ref_fields(entry.0)
              |> list.append([#("body", json.string(entry.1))]),
            )
          }),
        ),
      ]),
    ),
    handler,
  )
}

pub fn fetch_insights(
  base: String,
  token: String,
  handler: fn(Result(Insights, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/insights",
    Some(token),
    None,
    insights_decoder(),
    handler,
  )
}

pub fn fetch_history(
  base: String,
  token: String,
  problem: ProblemRef,
  handler: fn(Result(List(ReviewRow), ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/history?category="
      <> uri_encode(problem.category)
      <> "&subcategory="
      <> uri_encode(problem.subcategory)
      <> "&title="
      <> uri_encode(problem.title),
    Some(token),
    None,
    decode.at(["reviews"], decode.list(review_row_decoder())),
    handler,
  )
}

@external(javascript, "./ffi.mjs", "uriEncode")
fn uri_encode(value: String) -> String

pub fn fetch_stats(
  base: String,
  token: String,
  handler: fn(Result(Stats, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/stats",
    Some(token),
    None,
    stats_decoder(),
    handler,
  )
}

// --- plumbing --------------------------------------------------------------

fn send(
  base: String,
  method: http.Method,
  path: String,
  token: Option(String),
  body: Option(Json),
  decoder: Decoder(value),
  handler: fn(Result(value, ApiError)) -> message,
) -> Effect(message) {
  case build(base, method, path, token, body) {
    Error(Nil) -> dispatch_error(handler, unreachable_base(base))
    Ok(request) ->
      rsvp.send(
        request,
        rsvp.expect_json(decoder, fn(result) {
          handler(result.map_error(result, translate))
        }),
      )
  }
}

/// For endpoints answering 204: there is no body to decode, and asking
/// `expect_json` for one would turn success into `UnhandledResponse`.
fn send_expecting_nothing(
  base: String,
  method: http.Method,
  path: String,
  token: Option(String),
  body: Option(Json),
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  case build(base, method, path, token, body) {
    Error(Nil) -> dispatch_error(handler, unreachable_base(base))
    Ok(request) ->
      rsvp.send(
        request,
        rsvp.expect_ok_response(fn(result) {
          handler(
            result
            |> result.replace(Nil)
            |> result.map_error(translate),
          )
        }),
      )
  }
}

fn build(
  base: String,
  method: http.Method,
  path: String,
  token: Option(String),
  body: Option(Json),
) -> Result(Request(String), Nil) {
  use request <- result.try(request.to(base <> path))
  let request = request.set_method(request, method)

  let request = case token {
    Some(token) ->
      request.set_header(request, "authorization", "Bearer " <> token)
    None -> request
  }

  Ok(case body {
    None -> request
    Some(body) ->
      request
      |> request.set_header("content-type", "application/json")
      |> request.set_body(json.to_string(body))
  })
}

fn unreachable_base(base: String) -> ApiError {
  case base {
    "" -> ServerFault("No backend is configured for this deployment.")
    _ -> ServerFault("The backend address is not a valid URL: " <> base)
  }
}

/// A failure that never left the browser still has to arrive as a message, or
/// the UI would sit on a spinner forever.
fn dispatch_error(
  handler: fn(Result(value, ApiError)) -> message,
  error: ApiError,
) -> Effect(message) {
  use dispatch <- effect.from
  dispatch(handler(Error(error)))
}

fn translate(error: rsvp.Error(String)) -> ApiError {
  case error {
    rsvp.NetworkError -> Offline
    rsvp.BadUrl(url) -> ServerFault("Bad request URL: " <> url)
    rsvp.BadBody -> ServerFault("The server sent a malformed response.")
    rsvp.JsonError(_) ->
      ServerFault("The server sent something this version can't read.")
    rsvp.UnhandledResponse(response) ->
      ServerFault(
        "Unexpected response from the server ("
        <> int.to_string(response.status)
        <> ").",
      )
    rsvp.HttpError(response) -> from_response(response)
  }
}

fn from_response(response: Response(String)) -> ApiError {
  let message =
    json.parse(response.body, decode.at(["message"], decode.string))
    |> result.unwrap("The server rejected that request.")
  let code =
    json.parse(response.body, decode.at(["error"], decode.string))
    |> result.unwrap("")

  case response.status, code {
    // Not every 401 means "your session ended". A failed sign-in is also a
    // 401, and answering it with "your session has expired" is nonsense to
    // someone who never had one -- and worse, `Unauthorised` is the signal
    // that drops the app back to guest and clears the stored token.
    401, "session_expired" | 401, "not_authenticated" -> Unauthorised
    401, _ -> Rejected(message)
    // 409 taken, 422 invalid, 429 throttled: all worth showing as written,
    // since the server phrases them for a human.
    _, _ ->
      case response.status {
        409 | 422 | 429 -> Rejected(message)
        _ -> ServerFault(message)
      }
  }
}

// --- codecs ----------------------------------------------------------------
//
// Re-exported from `wire` so the call sites here and in `local`/`store` read
// the same as they always did. There is no second implementation behind any
// of these any more.

pub const card_json = wire.card_to_json

pub const settings_json = wire.settings_to_json

pub const state_code = wire.state_code

pub const state_step = wire.state_step

pub const card_decoder = wire.card_decoder

pub const today_decoder = wire.today_decoder

pub const settings_decoder = wire.settings_decoder

pub const session_decoder = wire.session_decoder

pub const boot_state_decoder = wire.boot_state_decoder

pub const review_outcome_decoder = wire.review_outcome_decoder

pub const stats_decoder = wire.stats_decoder

pub const insights_decoder = wire.insights_decoder

pub const review_row_decoder = wire.review_row_decoder

fn credentials_json(email: String, password: String) -> Json {
  json.object([
    #("email", json.string(email)),
    #("password", json.string(password)),
  ])
}
