//// Server-side execution of one Elixir or Go attempt.
////
//// No browser can compile Elixir or Go source, so those drills run here:
//// the attempt and its harness are written to a scratch directory and
//// server/priv/run-elixir or run-go is run on them in a fresh, short-lived,
//// resource-limited process -- under `timeout -s KILL`, and in the
//// container as a user with no access to this process's environment (see
//// config.run_as_user and server/Dockerfile). The runner prints a JSON
//// report as its last line; anything before it is the compiler talking on
//// stderr, which is appended to the attempt's own output so a warning is
//// not lost.
////
//// This is the one place untrusted code touches the host. The boundary is
//// the uid plus the limits in the priv/run-* wrappers, not anything in this
//// file: assume the attempt is hostile and make sure it can only waste its
//// own few seconds.

import gleam/bit_array
import gleam/crypto
import gleam/erlang/application
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import server/config.{type Config}
import simplifile
import wire.{type RunResult, RunError, RunResult}

pub type Language {
  Elixir
  /// A Go attempt is compiled before it runs, and `go build` is not charged
  /// to the attempt's clock: see `timeout_seconds`.
  Go
}

/// Wall clock for one attempt, after which it is killed. The browser
/// workers get the same eight seconds as Elixir; Go gets a few more because
/// the compiler and linker run inside the same clock (about a second with
/// the cache server/Dockerfile warms, several without).
pub fn timeout_seconds(language: Language) -> Int {
  case language {
    Elixir -> 8
    Go -> 14
  }
}

/// The wire name the app sends, or nothing for a language that runs in the
/// browser (or does not exist).
pub fn language(name: String) -> Result(Language, Nil) {
  case name {
    "elixir" -> Ok(Elixir)
    "go" -> Ok(Go)
    _ -> Error(Nil)
  }
}

/// Where attempts are staged. World-readable, so the runner user can read
/// them; per-run directories are deleted the moment the run reports.
const scratch_root = "/tmp/gleamdrill-run"

/// The compiler's stderr, appended to the output, is capped like stdout.
const noise_cap = 4000

pub fn run(
  config: Config,
  language: Language,
  solution: String,
  harness: String,
) -> RunResult {
  case stage(language, solution, harness) {
    Error(reason) -> internal("Could not stage the attempt: " <> reason)
    Ok(dir) -> {
      let timeout = timeout_seconds(language)
      let outcome = case command(config, language, dir) {
        Error(reason) -> internal(reason)
        Ok(#(executable, args)) ->
          interpret(language, ffi_run(executable, args, { timeout + 4 } * 1000))
      }
      let _ = simplifile.delete(dir)
      outcome
    }
  }
}

pub fn run_elixir(
  config: Config,
  solution: String,
  harness: String,
) -> RunResult {
  run(config, Elixir, solution, harness)
}

pub fn run_go(config: Config, solution: String, harness: String) -> RunResult {
  run(config, Go, solution, harness)
}

/// An Elixir attempt is two scripts. A Go attempt is a package: the two
/// files plus the prelude the harness calls into (types, `run`, `tc`, list
/// and tree builders -- one copy, in priv/go, that `make content` refreshes
/// from drills/go/prelude.go) and a go.mod naming the module.
fn stage(
  language: Language,
  solution: String,
  harness: String,
) -> Result(String, String) {
  let dir =
    scratch_root
    <> "/"
    <> bit_array.base16_encode(crypto.strong_random_bytes(8))
  use _ <- result.try(
    simplifile.create_directory_all(dir)
    |> result.map_error(simplifile.describe_error),
  )
  // The runner is another user: it has to be able to walk in and read.
  use _ <- result.try(
    simplifile.set_permissions_octal(dir, 0o755)
    |> result.map_error(simplifile.describe_error),
  )
  case language {
    Elixir -> {
      use _ <- result.try(write_readable(dir <> "/solution.exs", solution))
      use _ <- result.try(write_readable(dir <> "/harness.exs", harness))
      Ok(dir)
    }
    Go -> {
      use priv <- result.try(priv_directory())
      use prelude <- result.try(
        simplifile.read(priv <> "/go/prelude.go")
        |> result.map_error(simplifile.describe_error),
      )
      use go_mod <- result.try(
        simplifile.read(priv <> "/go/go.mod")
        |> result.map_error(simplifile.describe_error),
      )
      use _ <- result.try(write_readable(dir <> "/solution.go", solution))
      use _ <- result.try(write_readable(dir <> "/harness.go", harness))
      use _ <- result.try(write_readable(dir <> "/prelude.go", prelude))
      use _ <- result.try(write_readable(dir <> "/go.mod", go_mod))
      Ok(dir)
    }
  }
}

fn priv_directory() -> Result(String, String) {
  application.priv_directory("server")
  |> result.replace_error("the server's priv directory is missing")
}

fn write_readable(path: String, contents: String) -> Result(Nil, String) {
  use _ <- result.try(
    simplifile.write(path, contents)
    |> result.map_error(simplifile.describe_error),
  )
  simplifile.set_permissions_octal(path, 0o644)
  |> result.map_error(simplifile.describe_error)
}

/// `timeout -s KILL 8 <priv>/run-elixir <dir>`, or with `run_as_user` set,
/// `timeout -s KILL 8 su -s /bin/sh <user> -c "exec <priv>/run-elixir <dir>"`
/// (run-go likewise, on its own clock).
/// `su` rather than a setuid helper because this process is root in the
/// container (server/Dockerfile says why); the directory name is hex, so
/// the quoted command carries nothing the shell could misread.
fn command(
  config: Config,
  language: Language,
  dir: String,
) -> Result(#(String, List(String)), String) {
  use timeout <- result.try(
    ffi_find_executable("timeout")
    |> result.replace_error("`timeout` is not on the server's PATH"),
  )
  use priv <- result.try(priv_directory())
  let wrapper = case language {
    Elixir -> priv <> "/run-elixir"
    Go -> priv <> "/run-go"
  }
  let run = case config.run_as_user {
    Some(user) -> [
      "su",
      "-s",
      "/bin/sh",
      user,
      "-c",
      "exec '" <> wrapper <> "' '" <> dir <> "'",
    ]
    None -> [wrapper, dir]
  }
  Ok(#(
    timeout,
    list.flatten([
      ["-s", "KILL", int.to_string(timeout_seconds(language))],
      run,
    ]),
  ))
}

/// The report is the last line the script printed; everything before it is
/// noise worth keeping (compiler warnings) but not part of the report.
fn interpret(language: Language, outcome: #(Int, String)) -> RunResult {
  let #(code, output) = outcome
  let lines =
    output
    |> string.split("\n")
    |> list.filter(fn(line) { string.trim(line) != "" })
  let #(noise, report) = case list.reverse(lines) {
    [last, ..rest] -> #(list.reverse(rest), Some(last))
    [] -> #([], None)
  }
  let noise = string.join(noise, "\n")

  case code, report {
    // 128 + SIGKILL: `timeout` ran out of patience.
    137, _ ->
      RunResult(
        cases: [],
        stdout: "",
        error: Some(RunError(
          "run",
          None,
          "Timed out after "
            <> int.to_string(timeout_seconds(language))
            <> " seconds. Infinite loop?",
        )),
      )
    // run-go's own code for "go build failed": the output is the compiler's.
    3, _ if language == Go -> go_compile_error(output)
    _, Some(last) ->
      case json.parse(last, wire.run_result_decoder()) {
        Ok(result) -> with_noise(result, noise)
        Error(_) -> crashed(code, output)
      }
    _, None -> crashed(code, output)
  }
}

/// `go build` reports `./solution.go:8:2: undefined: foo`, one line per
/// error, after a `# drill` banner. The first error in the attempt names
/// the line; an error in the harness would be a bug in the drill and is
/// shown whole with no line.
fn go_compile_error(output: String) -> RunResult {
  let lines =
    output
    |> string.split("\n")
    |> list.filter(fn(line) {
      string.trim(line) != "" && !string.starts_with(line, "#")
    })
  let line =
    lines
    |> list.find_map(fn(line) {
      case string.split_once(line, "./solution.go:") {
        Ok(#(_, rest)) ->
          rest
          |> string.split(":")
          |> list.first
          |> result.try(int.parse)
        Error(Nil) -> Error(Nil)
      }
    })
    |> option.from_result
  let message =
    lines
    |> list.map(fn(line) {
      case string.split_once(line, "./solution.go:") {
        Ok(#(_, rest)) -> rest
        Error(Nil) -> line
      }
    })
    |> string.join("\n")
  RunResult(
    cases: [],
    stdout: "",
    error: Some(RunError("compile", line, cap(message))),
  )
}

fn with_noise(result: RunResult, noise: String) -> RunResult {
  case noise {
    "" -> result
    noise ->
      RunResult(..result, stdout: case result.stdout {
        "" -> cap(noise)
        stdout -> stdout <> "\n" <> cap(noise)
      })
  }
}

/// The VM died without reporting: out of memory, killed by a limit, or the
/// attempt called System.halt. The tail of whatever it printed is the best
/// explanation available.
fn crashed(code: Int, output: String) -> RunResult {
  RunResult(
    cases: [],
    stdout: "",
    error: Some(RunError(
      "run",
      None,
      "The run ended without a result (exit "
        <> int.to_string(code)
        <> ")."
        <> case string.trim(output) {
        "" -> ""
        text -> "\n" <> cap(text)
      },
    )),
  )
}

fn internal(message: String) -> RunResult {
  RunResult(
    cases: [],
    stdout: "",
    error: Some(RunError("internal", None, message)),
  )
}

fn cap(text: String) -> String {
  case string.length(text) > noise_cap {
    True -> string.slice(text, 0, noise_cap) <> "\n\u{2026} (truncated)"
    False -> text
  }
}

@external(erlang, "exec_ffi", "run")
fn ffi_run(
  executable: String,
  args: List(String),
  timeout_ms: Int,
) -> #(Int, String)

@external(erlang, "exec_ffi", "find_executable")
fn ffi_find_executable(name: String) -> Result(String, Nil)
