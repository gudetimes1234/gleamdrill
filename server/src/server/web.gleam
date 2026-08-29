//// Request context and the middleware stack every route runs through.

import cors_builder as cors
import gleam/http
import gleam/http/request
import gleam/json.{type Json}
import gleam/list
import gleam/result
import gleam/string
import pog
import server/auth.{type AuthError, type User}
import server/config.{type Config}
import wisp

/// Everything a handler needs that is not in the request itself.
pub type Context {
  Context(db: pog.Connection, config: Config)
}

/// Common middleware. Ordering matters: CORS has to see the preflight before
/// anything else can reject it, and `rescue_crashes` has to wrap everything it
/// is meant to catch.
pub fn middleware(
  request: wisp.Request,
  context: Context,
  handler: fn(wisp.Request) -> wisp.Response,
) -> wisp.Response {
  use <- wisp.log_request(request)
  use <- wisp.rescue_crashes()
  use request <- wisp.handle_head(request)
  use request <- cors.wisp_middleware(request, cors_policy(context.config))
  handler(request)
}

/// Explicit origins only, never a wildcard: the browser sends a bearer token
/// to this API, and a wildcard would let any site read the responses.
fn cors_policy(config: Config) -> cors.Cors {
  list.fold(config.allowed_origins, cors.new(), cors.allow_origin)
  |> cors.allow_method(http.Get)
  |> cors.allow_method(http.Post)
  |> cors.allow_method(http.Put)
  |> cors.allow_method(http.Delete)
  |> cors.allow_header("content-type")
  |> cors.allow_header("authorization")
  |> cors.max_age(86_400)
}

// --- responses -------------------------------------------------------------

pub fn json_ok(data: Json) -> wisp.Response {
  data |> json.to_string |> wisp.json_response(200)
}

/// Errors carry a stable machine-readable `error` code alongside the human
/// message, so the client can branch on the code without matching on prose.
pub fn error(status: Int, code: String, message: String) -> wisp.Response {
  json.object([
    #("error", json.string(code)),
    #("message", json.string(message)),
  ])
  |> json.to_string
  |> wisp.json_response(status)
}

/// Maps an auth failure to a response.
///
/// Note every credential failure collapses to the same 401 body: telling the
/// client whether the email was known would hand an attacker an account
/// enumeration oracle.
pub fn auth_error(failure: AuthError) -> wisp.Response {
  case failure {
    auth.InvalidCredentials ->
      error(401, "invalid_credentials", "Incorrect email or password.")
    auth.SessionExpired ->
      error(401, "session_expired", "Your session has expired. Sign in again.")
    auth.EmailTaken ->
      error(409, "email_taken", "That email is already registered.")
    auth.InvalidEmail ->
      error(422, "invalid_email", "That is not a valid email address.")
    auth.WeakPassword(reason) ->
      error(422, "weak_password", "Password " <> reason <> ".")
    auth.TooManyAttempts ->
      error(
        429,
        "too_many_attempts",
        "Too many sign-in attempts. Try again in a few minutes.",
      )
    auth.DatabaseError(detail) -> {
      // The detail can quote SQL and column names, so it goes to the log, not
      // to the client.
      wisp.log_error("database error: " <> detail)
      error(500, "server_error", "Something went wrong. Try again.")
    }
  }
}

// --- authentication --------------------------------------------------------

/// Runs `next` only for a request carrying a valid bearer token.
pub fn require_user(
  request: wisp.Request,
  context: Context,
  next: fn(User) -> wisp.Response,
) -> wisp.Response {
  case bearer_token(request) {
    Error(Nil) ->
      error(401, "not_authenticated", "This endpoint requires a bearer token.")
    Ok(token) ->
      case auth.authenticate(context.db, token, context.config.session_days) {
        Ok(user) -> next(user)
        Error(failure) -> auth_error(failure)
      }
  }
}

pub fn bearer_token(request: wisp.Request) -> Result(String, Nil) {
  use header <- result.try(request.get_header(request, "authorization"))
  case string.split(string.trim(header), " ") {
    [scheme, token] ->
      case string.lowercase(scheme) == "bearer", token != "" {
        True, True -> Ok(token)
        _, _ -> Error(Nil)
      }
    _ -> Error(Nil)
  }
}

/// Best-effort client address, used only to key login throttling.
///
/// Behind Fly's proxy `fly-client-ip` is authoritative; `x-forwarded-for` is
/// the general fallback and only its first entry is trustworthy. Both are
/// client-controllable when the app is reached directly, which is why they key
/// throttling and nothing else.
pub fn client_ip(request: wisp.Request) -> String {
  let forwarded =
    request.get_header(request, "fly-client-ip")
    |> result.lazy_or(fn() {
      request.get_header(request, "x-forwarded-for")
      |> result.map(fn(value) {
        value |> string.split(",") |> list_first_or(value) |> string.trim
      })
    })
  result.unwrap(forwarded, "unknown")
}

fn list_first_or(values: List(String), fallback: String) -> String {
  case values {
    [first, ..] -> first
    [] -> fallback
  }
}
