//// App-side driver for the per-language grading workers: lazy spawn, run
//// requests, timeout + restart, and decoding worker messages into `Event`s.
//// Every effect takes a `to` that turns an `Event` into the caller's own
//// message, so the runner sits below every page that runs code.
//// Every worker speaks the same protocol; the language tag routes messages
//// back to the right runtime state.

import gleam/dynamic/decode.{type Decoder}
import gleam/json
import gleam/list
import gleam/option.{type Option, None}
import gleam/string
import gleamdrill/model.{type RunOutcome, CaseResult, Cases, Errored, RunError}
import lustre/effect.{type Effect}

/// What a runtime reports back.
pub type Event {
  /// The worker booted, or the language runs on the server and needs none.
  Ready(language: String)
  /// The worker could not start or serve.
  Failed(language: String, message: String)
  /// A run's verdict, with what it printed.
  Finished(id: Int, outcome: RunOutcome, stdout: String)
  /// A run that never answered.
  TimedOut(id: Int)
  /// A worker that never said it was ready.
  LoadTimedOut(language: String)
}

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

/// The harness for a scratch run: yields no cases, so the Output pane is the
/// whole result. Python and Elixir are scripts whose top level already ran;
/// Gleam, TypeScript and Go are libraries with nothing to run until called,
/// so their scratch harness calls an entry point the attempt may define --
/// `main` in Gleam and TypeScript, `scratch` in Go, where `main` belongs to
/// the prelude. A missing entry point is an ordinary compile error.
pub fn scratch_harness(language: String) -> String {
  case language {
    "python" -> "__results__ = []\n"
    "typescript" ->
      "import * as solution from \"./solution\";\nexport function run(): [string, string, string][] {\n  if (typeof (solution as any).main === \"function\") (solution as any).main();\n  return [];\n}\n"
    "gleam" ->
      "import solution\n\npub fn run() -> List(#(String, String, String)) {\n  solution.main()\n  []\n}\n"
    "elixir" -> "[]\n"
    "go" ->
      "package main\n\nfunc main() {\n\trun(func() []testCase {\n\t\tscratch()\n\t\treturn []testCase{}\n\t})\n}\n"
    "haskell" ->
      "module Main where\n\nimport Drill\nimport Solution (scratch)\n\nmain :: IO ()\nmain = runCases (scratch >> pure [])\n"
    // A Ruby file runs as it loads, so the attempt's own top-level code is
    // the scratch run.
    "ruby" -> "# no cases\n"
    _ -> ""
  }
}

/// What the Run button should say the scratch run does, per language.
pub fn scratch_hint(language: String) -> String {
  case language {
    // Gleam and Go REQUIRE the entry point -- without it the scratch run is
    // a compile error, not a quiet no-op. Only TypeScript's harness checks
    // before calling.
    "gleam" ->
      "Runs your code alone by calling main() — define pub fn main() first. Output shows below."
    "typescript" ->
      "Runs your code alone, calling main() if you define one. Output shows below."
    "go" ->
      "Runs your code alone by calling scratch() — define func scratch() first. Output shows below."
    "haskell" ->
      "Runs your code alone by calling scratch — define scratch :: IO () first. Output shows below."
    _ -> "Runs your code alone, no tests. Output shows below."
  }
}

/// Languages with no browser runtime at all: the run is an HTTP request to
/// the server instead (store.post_run), and "the runtime" is ready the moment
/// it is asked for. Elixir, Go, Haskell and Ruby; see problem.Check.
pub fn is_remote(language: String) -> Bool {
  language == "elixir"
  || language == "go"
  || language == "haskell"
  || language == "ruby"
}

/// How long the app waits on a server-side run before calling it lost. The
/// server kills an attempt after eight seconds and answers; this is only for
/// a request that never comes back at all.
pub const remote_timeout_ms = 20_000

/// The Python worker is classic (Brython needs importScripts); the others are
/// module workers. Explicit arms: routing an unknown language (concept) to the
/// Gleam worker by default was a trap waiting for a check to be added.
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
pub fn ensure(language: String, to: fn(Event) -> msg) -> Effect(msg) {
  effect.from(fn(dispatch) {
    case is_remote(language), worker_config(language) {
      True, _ -> dispatch(to(Ready(language)))
      False, Ok(#(url, is_module)) -> {
        ffi_spawn(
          language,
          url,
          is_module,
          fn(raw) { dispatch(to(decode_message(language, raw))) },
          fn(message) { dispatch(to(Failed(language, message))) },
        )
        ffi_after(load_timeout_ms, fn() { dispatch(to(LoadTimedOut(language))) })
      }
      False, Error(Nil) ->
        dispatch(to(Failed(language, "No runtime exists for this language.")))
    }
  })
}

/// Terminate a hung worker and boot a fresh one.
pub fn restart(language: String, to: fn(Event) -> msg) -> Effect(msg) {
  effect.from(fn(dispatch) {
    case is_remote(language), worker_config(language) {
      True, _ -> dispatch(to(Ready(language)))
      False, Ok(#(url, is_module)) -> {
        ffi_restart(
          language,
          url,
          is_module,
          fn(raw) { dispatch(to(decode_message(language, raw))) },
          fn(message) { dispatch(to(Failed(language, message))) },
        )
        ffi_after(load_timeout_ms, fn() { dispatch(to(LoadTimedOut(language))) })
      }
      False, Error(Nil) ->
        dispatch(to(Failed(language, "No runtime exists for this language.")))
    }
  })
}

/// The timeout for a run that happens elsewhere (the server); the request
/// itself is store.post_run. Stale ids are ignored exactly as for workers.
pub fn arm_remote_timeout(id: Int, to: fn(Event) -> msg) -> Effect(msg) {
  effect.from(fn(dispatch) {
    ffi_after(remote_timeout_ms, fn() { dispatch(to(TimedOut(id))) })
  })
}

/// Post a run request and arm its timeout. The timeout always fires; stale ids
/// are ignored by the update loop, so it needs no cancellation.
pub fn run(
  language: String,
  id: Int,
  solution: String,
  harness: String,
  to: fn(Event) -> msg,
) -> Effect(msg) {
  effect.from(fn(dispatch) {
    case ffi_post_run(language, id, solution, harness) {
      True -> ffi_after(run_timeout_ms, fn() { dispatch(to(TimedOut(id))) })
      // No worker to post to: fail loudly now rather than letting the
      // timeout blame the user's code for an infinite loop in 8 seconds.
      False -> dispatch(to(Failed(language, "The runtime was not running.")))
    }
  })
}

fn decode_message(language: String, raw: String) -> Event {
  case json.parse(raw, message_decoder(language)) {
    Ok(msg) -> msg
    Error(details) ->
      Failed(
        language,
        "The runtime sent an unreadable message: " <> string.inspect(details),
      )
  }
}

fn message_decoder(language: String) -> Decoder(Event) {
  use kind <- decode.field("type", decode.string)
  case kind {
    "ready" -> decode.success(Ready(language))
    // The worker's own report that it cannot serve at all: a boot failure or
    // a request it could not even attribute to a run.
    "fatal" -> {
      use message <- decode.field("message", decode.string)
      decode.success(Failed(language, message))
    }
    "result" -> {
      use id <- decode.field("id", decode.int)
      use stdout <- stdout_field()
      use warnings <- warnings_field()
      use outcome <- result_decoder()
      decode.success(Finished(id, outcome, with_warnings(stdout, warnings)))
    }
    "error" -> {
      use id <- decode.field("id", decode.int)
      use stdout <- stdout_field()
      use warnings <- warnings_field()
      use outcome <- error_decoder()
      decode.success(Finished(id, outcome, with_warnings(stdout, warnings)))
    }
    _ -> decode.failure(Ready(language), "Event")
  }
}

fn result_decoder(next: fn(RunOutcome) -> Decoder(Event)) -> Decoder(Event) {
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

fn error_decoder(next: fn(RunOutcome) -> Decoder(Event)) -> Decoder(Event) {
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

/// A warning located in the generated harness module. The user cannot act on
/// it -- `check.gleam`'s `import solution` goes "unused" whenever the attempt
/// fails to compile against the harness, because a broken reference is not a
/// use -- so it stays out of the Output panel. Warnings in the attempt's own
/// module still ride along.
pub fn harness_warning(warning: String) -> Bool {
  string.contains(warning, "/src/check.gleam")
}

pub fn with_warnings(stdout: String, warnings: List(String)) -> String {
  case list.filter(warnings, fn(w) { !harness_warning(w) }) {
    [] -> stdout
    kept ->
      stdout <> "\n\n\u{26a0} Compiler warnings:\n" <> string.join(kept, "\n\n")
  }
}

fn nullable_field(
  name: String,
  inner: Decoder(a),
  next: fn(Option(a)) -> Decoder(b),
) -> Decoder(b) {
  decode.optional_field(name, None, decode.optional(inner), next)
}

@external(javascript, "./runner/runner_ffi.mjs", "spawn")
fn ffi_spawn(
  language: String,
  url: String,
  is_module: Bool,
  on_message: fn(String) -> Nil,
  on_error: fn(String) -> Nil,
) -> Nil

@external(javascript, "./runner/runner_ffi.mjs", "restart")
fn ffi_restart(
  language: String,
  url: String,
  is_module: Bool,
  on_message: fn(String) -> Nil,
  on_error: fn(String) -> Nil,
) -> Nil

@external(javascript, "./runner/runner_ffi.mjs", "post_run")
fn ffi_post_run(
  language: String,
  id: Int,
  solution: String,
  harness: String,
) -> Bool

@external(javascript, "./runner/runner_ffi.mjs", "after")
fn ffi_after(delay_ms: Int, callback: fn() -> Nil) -> Nil
