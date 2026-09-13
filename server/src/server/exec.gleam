//// Server-side execution of one Elixir attempt.
////
//// No browser can compile Elixir source, so Elixir drills run here: the
//// attempt and its harness are written to a scratch directory and
//// server/priv/run.exs is run on them in a fresh, short-lived, resource-
//// limited VM -- under `timeout -s KILL`, and in the container as a user
//// with no access to this process's environment (see config.run_as_user
//// and server/Dockerfile). The script prints a JSON report as its last
//// line; anything before it is the compiler talking on stderr, which is
//// appended to the attempt's own output so a warning is not lost.
////
//// This is the one place untrusted code touches the host. The boundary is
//// the uid plus the limits in server/priv/run-elixir, not anything in this
//// file: assume the attempt is hostile and make sure it can only waste its
//// own eight seconds.

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

/// Wall clock for one attempt, after which it is killed. The browser
/// workers get the same eight seconds.
pub const timeout_seconds = 8

/// Where attempts are staged. World-readable, so the runner user can read
/// them; per-run directories are deleted the moment the run reports.
const scratch_root = "/tmp/algodrill-run"

/// The compiler's stderr, appended to the output, is capped like stdout.
const noise_cap = 4000

pub fn run_elixir(
  config: Config,
  solution: String,
  harness: String,
) -> RunResult {
  case stage(solution, harness) {
    Error(reason) -> internal("Could not stage the attempt: " <> reason)
    Ok(dir) -> {
      let outcome = case command(config, dir) {
        Error(reason) -> internal(reason)
        Ok(#(executable, args)) ->
          interpret(ffi_run(executable, args, { timeout_seconds + 4 } * 1000))
      }
      let _ = simplifile.delete(dir)
      outcome
    }
  }
}

fn stage(solution: String, harness: String) -> Result(String, String) {
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
  use _ <- result.try(write_readable(dir <> "/solution.exs", solution))
  use _ <- result.try(write_readable(dir <> "/harness.exs", harness))
  Ok(dir)
}

fn write_readable(path: String, contents: String) -> Result(Nil, String) {
  use _ <- result.try(
    simplifile.write(path, contents)
    |> result.map_error(simplifile.describe_error),
  )
  simplifile.set_permissions_octal(path, 0o644)
  |> result.map_error(simplifile.describe_error)
}

/// `timeout -s KILL 8 [doas -u <user>] <priv>/run-elixir <dir>`.
fn command(
  config: Config,
  dir: String,
) -> Result(#(String, List(String)), String) {
  use timeout <- result.try(
    ffi_find_executable("timeout")
    |> result.replace_error("`timeout` is not on the server's PATH"),
  )
  use priv <- result.try(
    application.priv_directory("server")
    |> result.replace_error("the server's priv directory is missing"),
  )
  let wrapper = priv <> "/run-elixir"
  let as_user = case config.run_as_user {
    Some(user) -> ["doas", "-u", user]
    None -> []
  }
  Ok(#(
    timeout,
    list.flatten([
      ["-s", "KILL", int.to_string(timeout_seconds)],
      as_user,
      [wrapper, dir],
    ]),
  ))
}

/// The report is the last line the script printed; everything before it is
/// noise worth keeping (compiler warnings) but not part of the report.
fn interpret(outcome: #(Int, String)) -> RunResult {
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
            <> int.to_string(timeout_seconds)
            <> " seconds. Infinite loop?",
        )),
      )
    _, Some(last) ->
      case json.parse(last, wire.run_result_decoder()) {
        Ok(result) -> with_noise(result, noise)
        Error(_) -> crashed(code, output)
      }
    _, None -> crashed(code, output)
  }
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
