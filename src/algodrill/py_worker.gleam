//// The Python grading worker. Speaks the same message protocol as the Gleam
//// worker (worker.gleam): {run} in, {ready|result|error} out.
////
//// Execution model: user code + harness + stash epilogue are concatenated
//// into one program and run under Brython. The harness records
//// [label, expected_repr, actual_repr] triples; the epilogue JSON-encodes
//// them onto the worker global, where the FFI picks them up.

import gleam/dynamic.{type Dynamic}
import gleam/dynamic/decode.{type Decoder}
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/string

const stash_epilogue = "

import json as __algodrill_json__
from browser import self as __algodrill_self__
__algodrill_self__.__algodrill_result__ = __algodrill_json__.dumps(__results__)
"

/// Runs before the user's code, so `print` is captured from the first line. It
/// hands each chunk to the FFI rather than buffering in Python, so the output
/// survives a raise — a crash never reaches the epilogue, and printing and then
/// crashing is exactly the case worth reading. Only stdout is redirected:
/// Brython reports tracebacks through stderr, and swallowing those would cost
/// the error messages.
const capture_prologue = "import sys as __algodrill_sys__
from browser import self as __algodrill_self__


class __AlgodrillOut__:
    def write(self, text):
        __algodrill_self__.__algodrill_write__(text)

    def flush(self):
        pass


__algodrill_sys__.stdout = __AlgodrillOut__()

"

/// Replaces Brython's `File "<worker bundle>", line N` header with the
/// corrected location, and drops it entirely when there is nothing true to put
/// in its place. Everything after it -- the offending source line, the caret,
/// and the error itself -- is worth keeping.
fn retitle_location(
  message: String,
  file: Option(String),
  line: Option(Int),
) -> String {
  string.split(message, "\n")
  |> list.filter_map(fn(row) {
    case string.starts_with(string.trim_start(row), "File \"") {
      False -> Ok(row)
      True ->
        case file, line {
          Some(name), Some(number) ->
            Ok("File \"" <> name <> "\", line " <> int.to_string(number))
          _, _ -> Error(Nil)
        }
    }
  })
  |> string.join("\n")
}

/// The prologue sits above the user's code, so every position Brython reports
/// is that many lines too high. Derived from the constant rather than written
/// down, because a hand-kept number is a line-number bug waiting to happen.
fn prologue_offset() -> Int {
  list.length(string.split(capture_prologue, "\n")) - 1
}

pub type Request {
  Request(id: Int, solution: String, harness: String)
}

pub fn main() -> Nil {
  ffi_on_message(fn(data) {
    case decode.run(data, request_decoder()) {
      Ok(request) -> serve(request)
      Error(_) -> Nil
    }
  })
  ffi_post_json(json.to_string(json.object([#("type", json.string("ready"))])))
}

fn request_decoder() -> Decoder(Request) {
  use kind <- decode.field("type", decode.string)
  use id <- decode.field("id", decode.int)
  use solution <- decode.field("solution", decode.string)
  use harness <- decode.field("harness", decode.string)
  case kind {
    "run" -> decode.success(Request(id, solution, harness))
    _ -> decode.failure(Request(0, "", ""), "Request")
  }
}

fn serve(request: Request) -> Nil {
  let program =
    capture_prologue
    <> request.solution
    <> "\n\n"
    <> request.harness
    <> stash_epilogue
  let outcome = ffi_run_python(program)
  let stdout = truncate(ffi_captured_stdout(), 4000)

  case decode.run(outcome, outcome_decoder()) {
    Ok(RanTo(triples)) -> post_result(request.id, triples, stdout)
    Ok(FailedWith(marker, message, line, column)) ->
      post_error(request.id, marker, message, line, column, stdout)
    Error(_) ->
      post_error(
        request.id,
        "",
        "The Python runtime produced an unreadable outcome.",
        None,
        None,
        stdout,
      )
  }
}

type Outcome {
  RanTo(List(List(String)))
  FailedWith(
    marker: String,
    message: String,
    line: Option(Int),
    column: Option(Int),
  )
}

fn outcome_decoder() -> Decoder(Outcome) {
  let ran = {
    use result <- decode.field("result", decode.string)
    case json.parse(result, decode.list(decode.list(decode.string))) {
      Ok(triples) -> decode.success(RanTo(triples))
      Error(_) -> decode.failure(RanTo([]), "Outcome")
    }
  }
  let failed = {
    use marker <- decode.subfield(["error", "marker"], decode.string)
    use message <- decode.subfield(["error", "message"], decode.string)
    use line <- decode.subfield(["error", "line"], decode.optional(decode.int))
    use column <- decode.subfield(
      ["error", "column"],
      decode.optional(decode.int),
    )
    decode.success(FailedWith(marker, message, line, column))
  }
  decode.one_of(ran, [failed])
}

fn post_result(id: Int, triples: List(List(String)), stdout: String) -> Nil {
  let cases =
    list.filter_map(triples, fn(triple) {
      case triple {
        [label, expected, actual] ->
          Ok(
            json.object([
              #("label", json.string(label)),
              #("expected", json.string(expected)),
              #("actual", json.string(actual)),
              #("passed", json.bool(expected == actual)),
            ]),
          )
        _ -> Error(Nil)
      }
    })
  ffi_post_json(
    json.to_string(
      json.object([
        #("type", json.string("result")),
        #("id", json.int(id)),
        #("cases", json.preprocessed_array(cases)),
        #("stdout", json.string(stdout)),
        #("warnings", json.array([], json.string)),
      ]),
    ),
  )
}

fn post_error(
  id: Int,
  marker: String,
  message: String,
  line: Option(Int),
  column: Option(Int),
  stdout: String,
) -> Nil {
  // The harness raises this marker when the expected function names are
  // missing — the UI turns file "check.py" into a friendly signature message.
  // Syntax errors carry a position and are attributed to the user's code.
  let #(phase, file) = case marker == "__signature_mismatch__", line {
    True, _ -> #("run", Some("check.py"))
    False, Some(_) -> #("compile", Some("solution.py"))
    False, None -> #("run", None)
  }
  let line = option.map(line, fn(n) { n - prologue_offset() })
  // Brython's traceback text carries its own location header, and that one is
  // neither corrected for the prologue nor written in terms the user knows:
  // it names the worker bundle. The structured fields above are right, so the
  // header in the message is rewritten to match rather than left to
  // contradict them.
  let message = retitle_location(strip_marker(message), file, line)
  ffi_post_json(
    json.to_string(
      json.object([
        #("type", json.string("error")),
        #("id", json.int(id)),
        #("phase", json.string(phase)),
        #("file", nullable_string(file)),
        #("line", nullable_int(line)),
        #("column", nullable_int(column)),
        #("message", json.string(message)),
        #("stdout", json.string(stdout)),
        #("warnings", json.array([], json.string)),
      ]),
    ),
  )
}

/// The traceback for the signature-mismatch marker is noise; everything else
/// keeps its (trimmed) traceback.
fn strip_marker(message: String) -> String {
  case string.contains(message, "__signature_mismatch__") {
    True -> "The expected function isn't defined."
    False -> truncate(message, 2000)
  }
}

fn truncate(text: String, max: Int) -> String {
  case string.length(text) > max {
    True -> string.slice(text, 0, max) <> "\u{2026}"
    False -> text
  }
}

fn nullable_string(value: Option(String)) -> Json {
  case value {
    Some(s) -> json.string(s)
    None -> json.null()
  }
}

fn nullable_int(value: Option(Int)) -> Json {
  case value {
    Some(i) -> json.int(i)
    None -> json.null()
  }
}

@external(javascript, "./py_worker_ffi.mjs", "run_python")
fn ffi_run_python(program: String) -> Dynamic

@external(javascript, "./py_worker_ffi.mjs", "captured_stdout")
fn ffi_captured_stdout() -> String

@external(javascript, "./py_worker_ffi.mjs", "post_json")
fn ffi_post_json(payload: String) -> Nil

@external(javascript, "./py_worker_ffi.mjs", "on_message")
fn ffi_on_message(handler: fn(Dynamic) -> Nil) -> Nil
