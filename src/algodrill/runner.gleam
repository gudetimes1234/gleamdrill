//// App-side driver for the compile-and-run worker: lazy spawn, run requests,
//// timeout + restart, and decoding worker messages into Msgs.

import algodrill/model.{
  type Msg, type RunOutcome, CaseResult, Cases, Errored, RunError, RunFinished,
  RunTimedOut, RunnerFailed, RunnerReady,
}
import gleam/dynamic/decode.{type Decoder}
import gleam/json
import gleam/option.{type Option, None}
import lustre/effect.{type Effect}

/// The vendored compiler version — must match GLEAM_VERSION in the Makefile.
/// Passed to the worker as ?v= so the runtime directory has a single source
/// of truth on this side.
pub const version = "1.18.1"

/// A run that exceeds this is presumed stuck in non-terminating recursion;
/// the worker cannot be interrupted, only terminated. Generous because a cold
/// worker's first compile also pays wasm init (~1s on slow hardware).
const run_timeout_ms = 8000

/// Spawn the worker if it is not already running. Safe to dispatch repeatedly.
pub fn ensure() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    ffi_spawn(version, fn(raw) { dispatch(decode_message(raw)) }, fn(message) {
      dispatch(RunnerFailed(message))
    })
  })
}

/// Terminate a hung worker and boot a fresh one.
pub fn restart() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    ffi_restart(version, fn(raw) { dispatch(decode_message(raw)) }, fn(message) {
      dispatch(RunnerFailed(message))
    })
  })
}

/// Post a run request and arm its timeout. The timeout always fires; stale ids
/// are ignored by the update loop, so it needs no cancellation.
pub fn run(id: Int, solution: String, harness: String) -> Effect(Msg) {
  effect.from(fn(dispatch) {
    ffi_post_run(id, solution, harness)
    ffi_after(run_timeout_ms, fn() { dispatch(RunTimedOut(id)) })
  })
}

fn decode_message(raw: String) -> Msg {
  case json.parse(raw, message_decoder()) {
    Ok(msg) -> msg
    Error(_) -> RunnerFailed("The Gleam runtime sent an unreadable message.")
  }
}

fn message_decoder() -> Decoder(Msg) {
  use kind <- decode.field("type", decode.string)
  case kind {
    "ready" -> decode.success(RunnerReady)
    "result" -> {
      use id <- decode.field("id", decode.int)
      use outcome <- result_decoder()
      decode.success(RunFinished(id, outcome))
    }
    "error" -> {
      use id <- decode.field("id", decode.int)
      use outcome <- error_decoder()
      decode.success(RunFinished(id, outcome))
    }
    _ -> decode.failure(RunnerReady, "Msg")
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

fn nullable_field(
  name: String,
  inner: Decoder(a),
  next: fn(Option(a)) -> Decoder(b),
) -> Decoder(b) {
  decode.optional_field(name, None, decode.optional(inner), next)
}

@external(javascript, "./runner_ffi.mjs", "spawn")
fn ffi_spawn(
  version: String,
  on_message: fn(String) -> Nil,
  on_error: fn(String) -> Nil,
) -> Nil

@external(javascript, "./runner_ffi.mjs", "restart")
fn ffi_restart(
  version: String,
  on_message: fn(String) -> Nil,
  on_error: fn(String) -> Nil,
) -> Nil

@external(javascript, "./runner_ffi.mjs", "post_run")
fn ffi_post_run(id: Int, solution: String, harness: String) -> Nil

@external(javascript, "./runner_ffi.mjs", "after")
fn ffi_after(delay_ms: Int, callback: fn() -> Nil) -> Nil
