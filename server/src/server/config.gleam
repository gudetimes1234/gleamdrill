//// Runtime configuration, read once at boot from the environment.
////
//// Everything here is required: the server refuses to start rather than fall
//// back to a default, because every one of these values is either a secret or
//// something that silently breaks auth if it is wrong.

import envoy
import gleam/int
import gleam/list
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
