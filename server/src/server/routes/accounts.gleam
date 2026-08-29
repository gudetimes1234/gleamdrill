//// Signup, login, logout, and "who am I".

import gleam/dynamic/decode
import gleam/http
import gleam/json
import gleam/option.{type Option, None, Some}
import server/auth.{type User}
import server/study
import server/web.{type Context}
import wisp

pub fn signup(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use body <- wisp.require_json(request)

  case decode.run(body, credentials_decoder()) {
    Error(_) ->
      web.error(422, "invalid_body", "Expected an email and password.")
    Ok(#(email, password, timezone)) ->
      case
        auth.signup(
          context.db,
          email,
          password,
          checked_timezone(context, timezone),
          context.config.session_days,
        )
      {
        Ok(#(user, token)) -> session_response(user, token)
        Error(failure) -> web.auth_error(failure)
      }
  }
}

/// The client sends its own zone, so it is checked against Postgres before
/// being stored -- an unknown name would otherwise break every subsequent
/// day-boundary query. Falling back to UTC is right: a wrong rollover hour is
/// a far smaller problem than a signup that fails.
fn checked_timezone(context: Context, requested: Option(String)) -> String {
  case requested {
    None -> "UTC"
    Some(zone) ->
      case study.timezone_is_valid(context.db, zone) {
        Ok(True) -> zone
        _ -> "UTC"
      }
  }
}

pub fn login(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use body <- wisp.require_json(request)

  case decode.run(body, credentials_decoder()) {
    Error(_) ->
      web.error(422, "invalid_body", "Expected an email and password.")
    Ok(#(email, password, _timezone)) ->
      case
        auth.login(
          context.db,
          email,
          password,
          web.client_ip(request),
          context.config.session_days,
        )
      {
        Ok(#(user, token)) -> session_response(user, token)
        Error(failure) -> web.auth_error(failure)
      }
  }
}

/// Deleting a session that does not exist is not an error: logging out should
/// succeed whatever state the client thought it was in.
pub fn logout(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  case web.bearer_token(request) {
    Error(Nil) -> wisp.no_content()
    Ok(token) ->
      case auth.logout(context.db, token) {
        Ok(Nil) -> wisp.no_content()
        Error(failure) -> web.auth_error(failure)
      }
  }
}

pub fn me(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)
  web.json_ok(json.object([#("user", user_json(user))]))
}

fn credentials_decoder() -> decode.Decoder(#(String, String, Option(String))) {
  use email <- decode.field("email", decode.string)
  use password <- decode.field("password", decode.string)
  // Optional: an older client, or a curl request, simply gets UTC.
  use timezone <- decode.optional_field(
    "timezone",
    None,
    decode.optional(decode.string),
  )
  decode.success(#(email, password, timezone))
}

/// The token is returned in the body rather than set as a cookie: the API is a
/// third-party origin relative to the app, and third-party cookies are being
/// phased out by browsers. See the plan for the same-domain upgrade path.
fn session_response(user: User, token: String) -> wisp.Response {
  web.json_ok(
    json.object([
      #("token", json.string(token)),
      #("user", user_json(user)),
    ]),
  )
}

pub fn user_json(user: User) -> json.Json {
  json.object([
    #("id", json.string(user.id)),
    #("email", json.string(user.email)),
  ])
}
