//// POST /api/run: runs an Elixir attempt on the server and reports the
//// cases, output and error the browser workers would have.

import gleam/dynamic/decode
import gleam/http
import gleam/string
import server/auth
import server/exec
import server/run_gate
import server/web.{type Context}
import wire
import wisp

/// Runs a user may start per window. A rep is a minute or more of typing
/// between runs; sixty in fifteen minutes is a loop, not a person.
const max_runs_per_window = 60

const window_minutes = 15

/// Attempts in flight at once, node-wide. See run_gate.
const max_in_flight = 2

/// Solution plus harness. The largest harness in the catalogue is a few
/// kilobytes; anything near this is not a drill.
const max_bytes = 65_536

pub fn run(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, wire.run_request_decoder()) {
    Error(_) ->
      web.error(
        422,
        "invalid_body",
        "Expected a language, a solution and a harness.",
      )
    Ok(input) ->
      case exec.language(input.language) {
        Ok(language) ->
          case
            string.byte_size(input.solution) + string.byte_size(input.harness)
            > max_bytes
          {
            True ->
              web.error(413, "too_large", "That attempt is too large to run.")
            False -> throttled(context, user, language, input)
          }
        Error(Nil) ->
          web.error(
            422,
            "unsupported_language",
            "Only Elixir and Go run on the server; "
              <> input.language
              <> " runs in the browser.",
          )
      }
  }
}

fn throttled(
  context: Context,
  user: auth.User,
  language: exec.Language,
  input: wire.RunRequest,
) -> wisp.Response {
  case
    auth.throttle(
      context.db,
      "run:" <> user.id,
      window_minutes,
      max_runs_per_window,
    )
  {
    Error(auth.TooManyAttempts) ->
      web.error(
        429,
        "rate_limited",
        "That is a lot of runs. Take a breath; the limit lifts in a few minutes.",
      )
    Error(failure) -> web.auth_error(failure)
    Ok(Nil) ->
      case run_gate.try_acquire(max_in_flight) {
        False ->
          web.error(
            429,
            "busy",
            "The server is running other attempts right now. Try again in a moment.",
          )
        True -> {
          let result =
            exec.run(context.config, language, input.solution, input.harness)
          run_gate.release()
          web.json_ok(wire.run_result_to_json(result))
        }
      }
  }
}
