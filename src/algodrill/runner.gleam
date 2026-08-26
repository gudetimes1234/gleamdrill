//// App-side driver for the per-language grading workers: lazy spawn, run
//// requests, timeout + restart, and decoding worker messages into Msgs.
//// Every worker speaks the same protocol; the language tag routes messages
//// back to the right runtime state.

import algodrill/model.{
  type Msg, type RunOutcome, CaseResult, Cases, Errored, RunError, RunFinished,
  RunTimedOut, RunnerFailed, RunnerReady,
}
import gleam/dynamic/decode.{type Decoder}
import gleam/json
import gleam/option.{type Option, None}
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

/// The Python worker is classic (Brython needs importScripts); the others are
/// module workers.
fn worker_config(language: String) -> #(String, Bool) {
  case language {
    "python" -> #("/python-worker.js?v=" <> python_version, False)
    "typescript" -> #("/ts-worker.js", True)
    _ -> #("/gleam-worker.js?v=" <> gleam_version, True)
  }
}

/// Spawn the language's worker if it is not already running. Safe to dispatch
/// repeatedly.
pub fn ensure(language: String) -> Effect(Msg) {
  effect.from(fn(dispatch) {
    let #(url, is_module) = worker_config(language)
    ffi_spawn(
      language,
      url,
      is_module,
      fn(raw) { dispatch(decode_message(language, raw)) },
      fn(message) { dispatch(RunnerFailed(language, message)) },
    )
  })
}

/// Terminate a hung worker and boot a fresh one.
pub fn restart(language: String) -> Effect(Msg) {
  effect.from(fn(dispatch) {
    let #(url, is_module) = worker_config(language)
    ffi_restart(
      language,
      url,
      is_module,
      fn(raw) { dispatch(decode_message(language, raw)) },
      fn(message) { dispatch(RunnerFailed(language, message)) },
    )
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
    ffi_post_run(language, id, solution, harness)
    ffi_after(run_timeout_ms, fn() { dispatch(RunTimedOut(id)) })
  })
}

fn decode_message(language: String, raw: String) -> Msg {
  case json.parse(raw, message_decoder(language)) {
    Ok(msg) -> msg
    Error(_) ->
      RunnerFailed(language, "The runtime sent an unreadable message.")
  }
}

fn message_decoder(language: String) -> Decoder(Msg) {
  use kind <- decode.field("type", decode.string)
  case kind {
    "ready" -> decode.success(RunnerReady(language))
    "result" -> {
      use id <- decode.field("id", decode.int)
      use stdout <- stdout_field()
      use outcome <- result_decoder()
      decode.success(RunFinished(id, outcome, stdout))
    }
    "error" -> {
      use id <- decode.field("id", decode.int)
      use stdout <- stdout_field()
      use outcome <- error_decoder()
      decode.success(RunFinished(id, outcome, stdout))
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
) -> Nil

@external(javascript, "./runner_ffi.mjs", "after")
fn ffi_after(delay_ms: Int, callback: fn() -> Nil) -> Nil
