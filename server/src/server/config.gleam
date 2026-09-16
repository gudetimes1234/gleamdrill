//// Runtime configuration, read once at boot from the environment.
////
//// Everything here is required: the server refuses to start rather than fall
//// back to a default, because every one of these values is either a secret or
//// something that silently breaks auth if it is wrong.

import envoy
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string

pub type Config {
  Config(
    port: Int,
    /// The interface to listen on. Localhost by default — this is a personal
    /// app and nothing else on the network has business talking to it;
    /// production sets BIND=0.0.0.0 because Fly's proxy arrives over the
    /// private network.
    bind: String,
    /// Standard `postgres://user:pass@host:port/database` URL.
    database_url: String,
    /// Signs wisp's cookies. Must be stable across restarts and at least 64
    /// bytes; rotating it invalidates every signed cookie.
    secret_key_base: String,
    /// The exact origins the browser app is served from, for CORS —
    /// comma-separated, never a wildcard: credentials must not be readable by
    /// an arbitrary site. Locally there are two (:1234 for `make dev`, :4173
    /// for the test file-server); production has one.
    allowed_origins: List(String),
    /// How long a session token stays valid without use.
    session_days: Int,
    /// The user server-side runs execute as, via `su`, which needs this
    /// process to be root. Set in the container (server/Dockerfile), where
    /// it is the whole point: an attempt running as the API's own user could
    /// read the API's environment -- this file's secrets -- out of /proc.
    /// Unset on a developer machine, where attempts run as whoever started
    /// the server.
    run_as_user: Option(String),
    /// Resend's API key, for the daily "N due" reminder mail. Unset means
    /// no reminders go out, and the loop that would send them never starts.
    resend_api_key: Option(String),
    /// The reminder's From line, e.g. `GleamDrill <reminders@example.com>`.
    /// Resend only sends from a domain it has verified.
    reminder_from: String,
    /// Where the reminder's link points: the first allowed origin unless
    /// APP_URL says otherwise.
    app_url: String,
  )
}

pub fn load() -> Result(Config, String) {
  use database_url <- result.try(required("DATABASE_URL"))
  use secret_key_base <- result.try(required("SECRET_KEY_BASE"))
  use allowed_origin <- result.try(required("ALLOWED_ORIGIN"))
  let allowed_origins =
    allowed_origin
    |> split_on_commas
  use port <- result.try(int_with_default("PORT", 1637))
  let bind = envoy.get("BIND") |> result.unwrap("127.0.0.1")
  use session_days <- result.try(int_with_default("SESSION_DAYS", 30))
  let run_as_user = case envoy.get("RUN_AS_USER") {
    Ok("") | Error(_) -> None
    Ok(user) -> Some(user)
  }
  let resend_api_key = case envoy.get("RESEND_API_KEY") {
    Ok("") | Error(_) -> None
    Ok(key) -> Some(key)
  }
  let reminder_from =
    envoy.get("REMINDER_FROM")
    |> result.unwrap("GleamDrill <onboarding@resend.dev>")
  let app_url = case envoy.get("APP_URL"), allowed_origins {
    Ok(url), _ if url != "" -> url
    _, [first, ..] -> first
    _, [] -> "https://gleamdrill.app"
  }

  // A short secret would still sign cookies, just badly. Fail loudly instead.
  case string.length(secret_key_base) < 64 {
    True -> Error("SECRET_KEY_BASE must be at least 64 characters")
    False ->
      Ok(Config(
        port:,
        bind:,
        database_url:,
        secret_key_base:,
        allowed_origins:,
        session_days:,
        run_as_user:,
        resend_api_key:,
        reminder_from:,
        app_url:,
      ))
  }
}

fn required(name: String) -> Result(String, String) {
  envoy.get(name)
  |> result.replace_error(name <> " is not set")
}

fn int_with_default(name: String, fallback: Int) -> Result(Int, String) {
  case envoy.get(name) {
    Error(_) -> Ok(fallback)
    Ok(raw) ->
      int.parse(raw)
      |> result.replace_error(name <> " must be an integer, got " <> raw)
  }
}

fn split_on_commas(raw: String) -> List(String) {
  raw
  |> string.split(",")
  |> list.map(string.trim)
  |> list.filter(fn(origin) { origin != "" })
}
