//// App-side driver for the per-language grading workers: lazy spawn, run
//// requests, timeout + restart, and decoding worker messages into Msgs.
//// Every worker speaks the same protocol; the language tag routes messages
//// back to the right runtime state.

import algodrill/model.{
  type Msg, type RunOutcome, CaseResult, Cases, Errored, RunError, RunFinished,
  RunTimedOut, RunnerFailed, RunnerReady, RuntimeLoadTimedOut,
}
import gleam/dynamic/decode.{type Decoder}
import gleam/json
import gleam/option.{type Option, None}
import gleam/string
import lustre/effect.{type Effect}

/// The vendored Gleam compiler version — must match GLEAM_VERSION in the
/// Makefile. Passed to the worker as ?v= so the runtime directory has a single
/// source of truth on this side.
pub const gleam_version = "1.18.1"

/// The vendored Brython version — must match BRYTHON_VERSION in the Makefile.
pub const python_version = "3.14.3"

/// A run that exceeds this is presumed stuck in a non-terminating loop; the
/// worker cannot be interrupted, only terminated.
const run_timeout_ms = 8000

/// A worker cannot load in under a millisecond or hang forever; past this the
/// fetch or init is presumed dead and the user is offered a Retry.
const load_timeout_ms = 30_000

/// The Python worker is classic (Brython needs importScripts); the others are
/// module workers. Explicit arms: routing an unknown language (elixir,
/// concept) to the Gleam worker by default was a trap waiting for a check to
/// be added.
fn worker_config(language: String) -> Result(#(String, Bool), Nil) {
  case language {
    "gleam" -> Ok(#("/gleam-worker.js?v=" <> gleam_version, True))
    "python" -> Ok(#("/python-worker.js?v=" <> python_version, False))
    "typescript" -> Ok(#("/ts-worker.js", True))
    _ -> Error(Nil)
  }
}

/// Spawn the language's worker if it is not already running. Safe to dispatch
/// repeatedly.
pub fn ensure(language: String) -> Effect(Msg) {
  effect.from(fn(dispatch) {
    case worker_config(language) {
      Ok(#(url, is_module)) -> {
        ffi_spawn(
          language,
          url,
          is_module,
          fn(raw) { dispatch(decode_message(language, raw)) },
          fn(message) { dispatch(RunnerFailed(language, message)) },
        )
        ffi_after(load_timeout_ms, fn() {
          dispatch(RuntimeLoadTimedOut(language))
        })
      }
      Error(Nil) ->
        dispatch(RunnerFailed(language, "No runtime exists for this language."))
    }
  })
}

/// Terminate a hung worker and boot a fresh one.
pub fn restart(language: String) -> Effect(Msg) {
  effect.from(fn(dispatch) {
    case worker_config(language) {
      Ok(#(url, is_module)) -> {
        ffi_restart(
          language,
          url,
          is_module,
          fn(raw) { dispatch(decode_message(language, raw)) },
          fn(message) { dispatch(RunnerFailed(language, message)) },
        )
        ffi_after(load_timeout_ms, fn() {
          dispatch(RuntimeLoadTimedOut(language))
        })
      }
      Error(Nil) ->
        dispatch(RunnerFailed(language, "No runtime exists for this language."))
    }
  })
}

/// Post a run request and arm its timeout. The timeout always fires; stale ids
/// are ignored by the update loop, so it needs no cancellation.
pub fn run(
  language: String,
  id: Int,
  solution: String,
  harness: String,
) -> Effect(Msg) {
  effect.from(fn(dispatch) {
    case ffi_post_run(language, id, solution, harness) {
      True -> ffi_after(run_timeout_ms, fn() { dispatch(RunTimedOut(id)) })
      // No worker to post to: fail loudly now rather than letting the
      // timeout blame the user's code for an infinite loop in 8 seconds.
      False -> dispatch(RunnerFailed(language, "The runtime was not running."))
    }
  })
}

fn decode_message(language: String, raw: String) -> Msg {
  case json.parse(raw, message_decoder(language)) {
    Ok(msg) -> msg
    Error(details) ->
      RunnerFailed(
        language,
        "The runtime sent an unreadable message: " <> string.inspect(details),
      )
  }
}

fn message_decoder(language: String) -> Decoder(Msg) {
  use kind <- decode.field("type", decode.string)
  case kind {
    "ready" -> decode.success(RunnerReady(language))
    // The worker's own report that it cannot serve at all: a boot failure or
    // a request it could not even attribute to a run.
    "fatal" -> {
      use message <- decode.field("message", decode.string)
      decode.success(RunnerFailed(language, message))
    }
    "result" -> {
      use id <- decode.field("id", decode.int)
      use stdout <- stdout_field()
      use warnings <- warnings_field()
      use outcome <- result_decoder()
      decode.success(RunFinished(id, outcome, with_warnings(stdout, warnings)))
    }
    "error" -> {
      use id <- decode.field("id", decode.int)
      use stdout <- stdout_field()
      use warnings <- warnings_field()
      use outcome <- error_decoder()
      decode.success(RunFinished(id, outcome, with_warnings(stdout, warnings)))
    }
    _ -> decode.failure(RunnerReady(language), "Msg")
  }
}

fn result_decoder(next: fn(RunOutcome) -> Decoder(Msg)) -> Decoder(Msg) {
  let case_decoder = {
    use label <- decode.field("label", decode.string)
    use expected <- decode.field("expected", decode.string)
    use actual <- decode.field("actual", decode.string)
    use passed <- decode.field("passed", decode.bool)
    decode.success(CaseResult(label, expected, actual, passed))
  }
  use cases <- decode.field("cases", decode.list(case_decoder))
  next(Cases(cases))
}

fn error_decoder(next: fn(RunOutcome) -> Decoder(Msg)) -> Decoder(Msg) {
  use phase <- decode.field("phase", decode.string)
  use file <- nullable_field("file", decode.string)
  use line <- nullable_field("line", decode.int)
  use column <- nullable_field("column", decode.int)
  use message <- decode.field("message", decode.string)
  next(Errored(RunError(phase, file, line, column, message)))
}

/// Optional so a worker bundle built before stdout capture still decodes.
fn stdout_field(next: fn(String) -> Decoder(a)) -> Decoder(a) {
  decode.optional_field("stdout", "", decode.string, next)
}

/// The Gleam worker has always shipped compiler warnings; until now nothing
/// read them. They ride into the Output panel under the program's own output.
fn warnings_field(next: fn(List(String)) -> Decoder(a)) -> Decoder(a) {
  decode.optional_field("warnings", [], decode.list(decode.string), next)
}

fn with_warnings(stdout: String, warnings: List(String)) -> String {
  case warnings {
    [] -> stdout
    _ ->
      stdout
      <> "\n\n\u{26a0} Compiler warnings:\n"
      <> string.join(warnings, "\n\n")
  }
}

fn nullable_field(
  name: String,
  inner: Decoder(a),
  next: fn(Option(a)) -> Decoder(b),
) -> Decoder(b) {
  decode.optional_field(name, None, decode.optional(inner), next)
}

@external(javascript, "./runner_ffi.mjs", "spawn")
fn ffi_spawn(
  language: String,
  url: String,
  is_module: Bool,
  on_message: fn(String) -> Nil,
  on_error: fn(String) -> Nil,
) -> Nil

@external(javascript, "./runner_ffi.mjs", "restart")
fn ffi_restart(
  language: String,
  url: String,
  is_module: Bool,
  on_message: fn(String) -> Nil,
  on_error: fn(String) -> Nil,
) -> Nil

@external(javascript, "./runner_ffi.mjs", "post_run")
fn ffi_post_run(
  language: String,
  id: Int,
  solution: String,
  harness: String,
) -> Bool

@external(javascript, "./runner_ffi.mjs", "after")
fn ffi_after(delay_ms: Int, callback: fn() -> Nil) -> Nil
