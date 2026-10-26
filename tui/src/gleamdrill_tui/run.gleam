//// Running an attempt against its check, off the browser.
////
//// The web compiles Python, TypeScript and Gleam inside the page; a
//// terminal has the real toolchains instead, so those run here, on this
//// machine. Go, Elixir and Haskell go to the server's `/api/run`, as they do
//// from the web. Every local runner prints a `wire.RunResult` as its last
//// line, the shape the server answers with, so one decoder reads them all
//// and pass/fail is the web's own rule: a case passes when the expected and
//// actual strings are equal.

import gleam/int
import gleam/javascript/promise.{type Promise}
import gleam/json
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import gleamdrill/content/problem.{type Language}
import gleamdrill/model.{
  type RunOutcome, type RunState, CaseResult, Cases, Errored, Ran, RunError,
  TimedOut,
}
import gleamdrill_tui/store
import gleamdrill_tui/sys
import wire

/// Seconds a local run gets before it is killed.
const local_timeout_ms = 8000

/// The first Gleam run compiles the standard library too.
const gleam_timeout_ms = 60_000

pub fn is_remote(language: Language) -> Bool {
  case language {
    problem.Elixir | problem.Go | problem.Haskell -> True
    _ -> False
  }
}

/// Why this language can't run here, if it can't.
pub fn unavailable(
  language: Language,
  token: option.Option(String),
) -> Result(Nil, String) {
  case language, token {
    problem.Python, _ ->
      case sys.which("python3") {
        True -> Ok(Nil)
        False ->
          Error("install python3 to run Python (Termux: pkg install python)")
      }
    problem.Gleam, _ ->
      case sys.which("gleam") {
        True -> Ok(Nil)
        False -> Error("install gleam to run Gleam (Termux: pkg install gleam)")
      }
    problem.TypeScript, _ ->
      case sys.node_major() >= 22 {
        True -> Ok(Nil)
        False -> Error("TypeScript needs Node 22 or newer")
      }
    problem.Elixir, None | problem.Go, None | problem.Haskell, None ->
      Error(
        "sign in to run "
        <> problem.language_label(language)
        <> " (settings, window 5)",
      )
    _, _ ->
      case is_remote(language) {
        True -> Ok(Nil)
        False ->
          Error(
            "nothing to run in a "
            <> problem.language_label(language)
            <> " drill",
          )
      }
  }
}

pub fn run(
  language: Language,
  token: option.Option(String),
  solution: String,
  harness: String,
) -> Promise(RunState) {
  case unavailable(language, token), language, token {
    Error(reason), _, _ -> promise.resolve(failed("internal", reason))
    Ok(Nil), problem.Python, _ -> python(solution, harness)
    Ok(Nil), problem.TypeScript, _ -> typescript(solution, harness)
    Ok(Nil), problem.Gleam, _ -> gleam(solution, harness)
    Ok(Nil), _, Some(token) -> remote(token, language, solution, harness)
    Ok(Nil), _, None ->
      promise.resolve(failed("internal", "sign in to run this"))
  }
}

fn failed(phase: String, message: String) -> RunState {
  Ran(Errored(RunError(phase, None, None, None, message)), "")
}

/// The server's answer, or a local runner's last line, as the web reads it.
pub fn from_result(result: wire.RunResult) -> RunState {
  let outcome: RunOutcome = case result.error {
    Some(error) ->
      Errored(RunError(error.phase, None, error.line, None, error.message))
    None ->
      Cases(
        list.map(result.cases, fn(case_) {
          CaseResult(case_.label, case_.expected, case_.actual, case_.passed)
        }),
      )
  }
  Ran(outcome, result.stdout)
}

/// A local runner's output: the report on the last line, anything the run
/// printed before it as stdout.
pub fn from_exit(
  exit: sys.Exit,
  compile_error: fn(String) -> RunState,
) -> RunState {
  case exit.timed_out {
    True -> Ran(TimedOut, exit.stdout)
    False -> {
      let lines =
        string.split(string.trim_end(exit.stdout), "\n")
        |> list.reverse
      case lines {
        [last, ..before] ->
          case json.parse(last, wire.run_result_decoder()) {
            Ok(result) -> {
              let printed = before |> list.reverse |> string.join("\n")
              let state = from_result(result)
              case state, printed {
                Ran(outcome, stdout), _ if printed != "" ->
                  Ran(outcome, string.trim(printed <> "\n" <> stdout))
                _, _ -> state
              }
            }
            Error(_) -> compile_error(exit.stderr <> exit.stdout)
          }
        [] -> compile_error(exit.stderr)
      }
    }
  }
}

fn generic_error(text: String) -> RunState {
  failed("run", case string.trim(text) {
    "" -> "the run ended without a result"
    text -> text
  })
}

fn in_temp_dir(work: fn(String) -> Promise(RunState)) -> Promise(RunState) {
  let dir = sys.temp_dir("gleamdrill-")
  use state <- promise.map(work(dir))
  sys.remove_dir(dir)
  state
}

fn write(dir: String, name: String, text: String) -> Nil {
  let _ = sys.write_file(dir <> "/" <> name, text)
  Nil
}

// --- Python -------------------------------------------------------------------------

/// The harness appends `[label, repr(expected), repr(actual)]` to
/// `__results__`; this is the epilogue that reports them, and the error
/// mapping the web's Brython worker does.
const python_runner = "import contextlib, io, json, sys, traceback

out = io.StringIO()
ns = {}

def report(cases, error):
    sys.__stdout__.write(\"\\n\" + json.dumps({\"cases\": cases, \"stdout\": out.getvalue()[:4000], \"error\": error}) + \"\\n\")

def solution_line(tb):
    line = None
    for frame in traceback.extract_tb(tb):
        if frame.filename == \"solution.py\":
            line = frame.lineno
    return line

try:
    with open(\"solution.py\") as f:
        solution = f.read()
    with open(\"harness.py\") as f:
        harness = f.read()
    with contextlib.redirect_stdout(out):
        exec(compile(solution, \"solution.py\", \"exec\"), ns)
        exec(compile(harness, \"harness.py\", \"exec\"), ns)
    cases = [
        {\"label\": label, \"expected\": expected, \"actual\": actual, \"passed\": expected == actual}
        for label, expected, actual in ns.get(\"__results__\", [])
    ]
    report(cases, None)
except SyntaxError as e:
    line = e.lineno if e.filename == \"solution.py\" else None
    report([], {\"phase\": \"compile\", \"line\": line, \"message\": \"%s: %s\" % (type(e).__name__, e.msg)})
except Exception as e:
    message = str(e)
    if message == \"__signature_mismatch__\":
        message = \"the check can't find the function it calls: keep the starter's name and arguments\"
    else:
        message = \"%s: %s\" % (type(e).__name__, message)
    report([], {\"phase\": \"run\", \"line\": solution_line(e.__traceback__), \"message\": message[:2000]})
"

fn python(solution: String, harness: String) -> Promise(RunState) {
  use dir <- in_temp_dir
  write(dir, "solution.py", solution)
  write(dir, "harness.py", harness)
  write(dir, "runner.py", python_runner)
  use exit <- promise.map(sys.run_captured(
    "python3",
    ["-I", "runner.py"],
    dir,
    local_timeout_ms,
  ))
  from_exit(exit, generic_error)
}

// --- TypeScript ---------------------------------------------------------------------

/// Node strips the types itself (no type checking, as in the web's sucrase).
/// The harness imports `./solution`; Node wants the extension spelled out.
const typescript_runner = "const printed = [];
for (const name of [\"log\", \"info\", \"warn\", \"error\", \"debug\"]) {
  console[name] = (...args) => printed.push(args.map(String).join(\" \"));
}
const report = (cases, error) =>
  process.stdout.write(\"\\n\" + JSON.stringify({ cases, stdout: printed.join(\"\\n\").slice(0, 4000), error }) + \"\\n\");
try {
  const harness = await import(\"./harness.ts\");
  const cases = harness.run().map(([label, expected, actual]) => ({ label, expected, actual, passed: expected === actual }));
  report(cases, null);
} catch (error) {
  let message = String(error?.message ?? error);
  if (message === \"__signature_mismatch__\")
    message = \"the check can't find the function it calls: keep the starter's name and export\";
  const line = String(error?.stack ?? \"\").match(/solution\\.ts:(\\d+)/);
  const phase = error instanceof SyntaxError ? \"compile\" : \"run\";
  report([], { phase, line: line ? Number(line[1]) : null, message: message.slice(0, 2000) });
}
"

fn typescript(solution: String, harness: String) -> Promise(RunState) {
  use dir <- in_temp_dir
  write(dir, "solution.ts", solution)
  write(
    dir,
    "harness.ts",
    harness
      |> string.replace("from \"./solution\"", "from \"./solution.ts\"")
      |> string.replace("from './solution'", "from './solution.ts'"),
  )
  write(dir, "runner.mjs", typescript_runner)
  // A package.json saying "module", so the .ts files load as ES modules.
  write(dir, "package.json", "{\"type\": \"module\"}\n")
  let flags = case sys.node_major() < 23 {
    True -> ["--experimental-strip-types"]
    False -> []
  }
  use exit <- promise.map(sys.run_captured(
    sys.node_path(),
    list.flatten([flags, ["--no-warnings", "runner.mjs"]]),
    dir,
    local_timeout_ms,
  ))
  from_exit(exit, generic_error)
}

// --- Gleam --------------------------------------------------------------------------

/// A project kept in the cache, so the standard library is fetched and
/// compiled once rather than on every run.
fn gleam_project() -> String {
  sys.cache_dir() <> "/gleam-run"
}

const gleam_toml = "name = \"drill\"
version = \"1.0.0\"
target = \"javascript\"

[dependencies]
gleam_stdlib = \">= 0.44.0 and < 2.0.0\"
"

const gleam_main = "import check

@external(javascript, \"./drill_ffi.mjs\", \"report\")
fn report(run: fn() -> List(#(String, String, String))) -> Nil

pub fn main() -> Nil {
  report(check.run)
}
"

const gleam_ffi = "const printed = [];
for (const name of [\"log\", \"info\", \"warn\", \"error\", \"debug\"]) {
  console[name] = (...args) => printed.push(args.map(String).join(\" \"));
}
const write = (cases, error) =>
  process.stdout.write(\"\\n\" + JSON.stringify({ cases, stdout: printed.join(\"\\n\").slice(0, 4000), error }) + \"\\n\");
export function report(run) {
  try {
    const cases = [...run()].map(([label, expected, actual]) => ({ label, expected, actual, passed: expected === actual }));
    write(cases, null);
  } catch (error) {
    const line = String(error?.stack ?? \"\").match(/solution\\.mjs:(\\d+)/);
    write([], { phase: \"run\", line: null, message: String(error?.message ?? error).slice(0, 2000) });
  }
}
"

fn gleam(solution: String, harness: String) -> Promise(RunState) {
  let dir = gleam_project()
  write(dir, "gleam.toml", gleam_toml)
  write(dir, "src/drill.gleam", gleam_main)
  write(dir, "src/drill_ffi.mjs", gleam_ffi)
  write(dir, "src/solution.gleam", solution)
  write(dir, "src/check.gleam", harness)
  use exit <- promise.map(sys.run_captured(
    "gleam",
    ["run", "--no-print-progress", "-m", "drill"],
    dir,
    gleam_timeout_ms,
  ))
  from_exit(exit, gleam_compile_error)
}

/// `gleam build`'s report, cut to the first error, with the solution's line.
pub fn gleam_compile_error(text: String) -> RunState {
  let first =
    case string.split_once(text, "error") {
      Ok(#(_, rest)) -> "error" <> rest
      Error(Nil) -> text
    }
    |> string.split("\n")
    |> list.take(14)
    |> string.join("\n")
  let line =
    string.split(first, "src/solution.gleam:")
    |> list.drop(1)
    |> list.first
    |> result.try(fn(rest) {
      rest |> string.split(":") |> list.first |> result.try(int.parse)
    })
    |> option.from_result
  case string.contains(text, "error") {
    True -> Ran(Errored(RunError("compile", None, line, None, first)), "")
    False -> generic_error(text)
  }
}

// --- the server ---------------------------------------------------------------------

fn remote(
  token: String,
  language: Language,
  solution: String,
  harness: String,
) -> Promise(RunState) {
  use answer <- promise.map(store.run(
    token,
    wire.RunRequest(problem.language_slug(language), solution, harness),
  ))
  case answer {
    Ok(result) -> from_result(result)
    Error(error) -> failed("internal", store.error_text(error))
  }
}
