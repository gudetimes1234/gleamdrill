//// The TypeScript grading worker. Same protocol as the other workers.
////
//// Sucrase transpiles (types stripped, no checking); the transpiled solution
//// becomes a data: URL, the harness's `from "./solution"` import is rewritten
//// to it, and the harness's run() returns [label, expected, actual] triples
//// graded here. Sucrase silently miscompiles `namespace` and strips
//// decorators, so both are rejected up front.

import gleam/dynamic.{type Dynamic}
import gleam/dynamic/decode.{type Decoder}
import gleam/javascript/promise.{type Promise}
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/string

pub type Request {
  Request(id: Int, solution: String, harness: String)
}

pub fn main() -> Nil {
  ffi_on_message(fn(data) {
    case decode.run(data, request_decoder()) {
      Ok(request) -> {
        let _ = serve(request)
        Nil
      }
      // Silence here meant an 8-second wait and a bogus "infinite loop"
      // verdict; answer with whatever can be said instead.
      Error(details) -> post_unreadable(data, details)
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

fn serve(request: Request) -> Promise(Nil) {
  case unsupported_syntax(request.solution) {
    Some(reason) -> {
      post_error(request.id, "compile", None, None, None, reason, "")
      promise.resolve(Nil)
    }
    None -> compile_and_run(request)
  }
}

/// Line-level scan for the two constructs sucrase gets silently wrong.
/// Lines inside template literals or block comments are skipped: `@` there is
/// text, not a decorator. Tracking is line-grained (unescaped backtick / the
/// comment delimiters flipping state), which matches how the drills are
/// written without pretending to be a parser.
fn unsupported_syntax(source: String) -> Option(String) {
  let lines =
    string.split(source, "\n")
    |> scannable_lines(False, False, [])
    |> list.map(string.trim)
  let is_namespace = fn(line) {
    string.starts_with(line, "namespace ")
    || string.starts_with(line, "module ")
    || string.starts_with(line, "declare namespace ")
    || string.starts_with(line, "declare module ")
  }
  case list.any(lines, is_namespace) {
    True ->
      Some(
        "TypeScript namespaces aren't supported here \u{2014} use plain functions and imports.",
      )
    False ->
      case list.any(lines, string.starts_with(_, "@")) {
        True ->
          Some("Decorators aren't supported here \u{2014} use plain functions.")
        False -> None
      }
  }
}

/// Keeps only the lines that are real code: state flips on an odd number of
/// backticks (template literal) and on /* ... */ pairs.
fn scannable_lines(
  lines: List(String),
  in_template: Bool,
  in_comment: Bool,
  acc: List(String),
) -> List(String) {
  case lines {
    [] -> list.reverse(acc)
    [line, ..rest] -> {
      let keep = !in_template && !in_comment
      let backticks =
        list.length(string.split(line, "`"))
        - 1
        - { list.length(string.split(line, "\\`")) - 1 }
      let in_template = case backticks % 2 {
        0 -> in_template
        _ -> !in_template
      }
      let in_comment = case in_template {
        True -> in_comment
        False ->
          case string.contains(line, "/*"), string.contains(line, "*/") {
            True, False -> True
            False, True -> False
            _, _ -> in_comment
          }
      }
      let acc = case keep {
        True -> [line, ..acc]
        False -> acc
      }
      scannable_lines(rest, in_template, in_comment, acc)
    }
  }
}

fn compile_and_run(request: Request) -> Promise(Nil) {
  case transform(request.solution) {
    Error(#(message, line, column)) -> {
      post_error(
        request.id,
        "compile",
        Some("solution.ts"),
        line,
        column,
        message,
        "",
      )
      promise.resolve(Nil)
    }
    Ok(solution_js) ->
      case transform(request.harness) {
        Error(#(message, _, _)) -> {
          // The harness ships with the drill; failing to transform it is a
          // repo bug, and blaming the user's signature for it was worse than
          // saying so.
          post_error(
            request.id,
            "internal",
            None,
            None,
            None,
            "The drill's harness failed to transform: " <> message,
            "",
          )
          promise.resolve(Nil)
        }
        Ok(harness_js) -> {
          let solution_url = ffi_to_data_url(solution_js)
          let check_url =
            harness_js
            |> string.replace(
              "from \"./solution\"",
              "from \"" <> solution_url <> "\"",
            )
            |> string.replace(
              "from './solution'",
              "from \"" <> solution_url <> "\"",
            )
            |> ffi_to_data_url

          use outcome <- promise.await(ffi_import_and_run(
            check_url,
            solution_url,
          ))
          report(request.id, outcome)
          promise.resolve(Nil)
        }
      }
  }
}

fn transform(
  source: String,
) -> Result(String, #(String, Option(Int), Option(Int))) {
  let decoder = {
    let ok = {
      use code <- decode.field("code", decode.string)
      decode.success(Ok(code))
    }
    let failed = {
      use message <- decode.subfield(["error", "message"], decode.string)
      use line <- decode.subfield(
        ["error", "line"],
        decode.optional(decode.int),
      )
      use column <- decode.subfield(
        ["error", "column"],
        decode.optional(decode.int),
      )
      decode.success(Error(#(message, line, column)))
    }
    decode.one_of(ok, [failed])
  }
  case decode.run(ffi_transform_ts(source), decoder) {
    Ok(result) -> result
    Error(_) -> Error(#("The TypeScript transform failed.", None, None))
  }
}

fn report(id: Int, outcome: Dynamic) -> Nil {
  let case_decoder = {
    use label <- decode.field("label", decode.string)
    use expected <- decode.field("expected", decode.string)
    use actual <- decode.field("actual", decode.string)
    decode.success(#(label, expected, actual))
  }
  let ran = {
    use cases <- decode.field("cases", decode.list(case_decoder))
    decode.success(Ok(cases))
  }
  let failed = {
    use message <- decode.field("error", decode.string)
    // Present when the throw's stack named the solution module; sucrase is
    // line-preserving so the position maps onto solution.ts.
    use line <- decode.optional_field("line", None, decode.optional(decode.int))
    use column <- decode.optional_field(
      "column",
      None,
      decode.optional(decode.int),
    )
    decode.success(Error(#(message, line, column)))
  }
  // Decoded on its own so both arms get it: printing and *then* throwing is
  // exactly when the output is worth reading.
  let stdout = case
    decode.run(outcome, {
      use text <- decode.optional_field("stdout", "", decode.string)
      decode.success(text)
    })
  {
    Ok(text) -> truncate(text, 4000)
    Error(_) -> ""
  }
  case decode.run(outcome, decode.one_of(ran, [failed])) {
    Ok(Ok(cases)) -> post_result(id, cases, stdout)
    Ok(Error(#(message, line, column))) ->
      case string.contains(message, "__signature_mismatch__") {
        True ->
          post_error(
            id,
            "run",
            Some("check.ts"),
            None,
            None,
            "The expected function isn't exported.",
            stdout,
          )
        False ->
          post_error(
            id,
            "run",
            case line {
              Some(_) -> Some("solution.ts")
              None -> None
            },
            line,
            column,
            truncate(message, 2000),
            stdout,
          )
      }
    Error(details) ->
      post_error(
        id,
        "run",
        None,
        None,
        None,
        truncate(
          "The harness produced an unreadable result: "
            <> string.inspect(details),
          2000,
        ),
        stdout,
      )
  }
}

/// A request that failed to decode still deserves an answer. With an id the
/// reply is an ordinary error; without one, "fatal" says the runtime itself is
/// unusable.
fn post_unreadable(data: Dynamic, details: List(decode.DecodeError)) -> Nil {
  let message =
    truncate(
      "The runtime received an unreadable request: " <> string.inspect(details),
      2000,
    )
  case decode.run(data, decode.at(["id"], decode.int)) {
    Ok(id) -> post_error(id, "internal", None, None, None, message, "")
    Error(_) ->
      ffi_post_json(
        json.to_string(
          json.object([
            #("type", json.string("fatal")),
            #("message", json.string(message)),
          ]),
        ),
      )
  }
}

/// Capped before postMessage: a print inside a hot loop must not reach the DOM.
fn truncate(text: String, max: Int) -> String {
  case string.length(text) > max {
    True -> string.slice(text, 0, max) <> "\u{2026}"
    False -> text
  }
}

fn post_result(
  id: Int,
  cases: List(#(String, String, String)),
  stdout: String,
) -> Nil {
  ffi_post_json(
    json.to_string(
      json.object([
        #("type", json.string("result")),
        #("id", json.int(id)),
        #(
          "cases",
          json.array(cases, fn(c) {
            json.object([
              #("label", json.string(c.0)),
              #("expected", json.string(c.1)),
              #("actual", json.string(c.2)),
              #("passed", json.bool(c.1 == c.2)),
            ])
          }),
        ),
        #("stdout", json.string(stdout)),
        #("warnings", json.array([], json.string)),
      ]),
    ),
  )
}

fn post_error(
  id: Int,
  phase: String,
  file: Option(String),
  line: Option(Int),
  column: Option(Int),
  message: String,
  stdout: String,
) -> Nil {
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

@external(javascript, "./ts_worker_ffi.mjs", "transform_ts")
fn ffi_transform_ts(source: String) -> Dynamic

@external(javascript, "./ts_worker_ffi.mjs", "to_data_url")
fn ffi_to_data_url(js: String) -> String

@external(javascript, "./ts_worker_ffi.mjs", "import_and_run")
fn ffi_import_and_run(url: String, solution_url: String) -> Promise(Dynamic)

@external(javascript, "./ts_worker_ffi.mjs", "post_json")
fn ffi_post_json(payload: String) -> Nil

@external(javascript, "./ts_worker_ffi.mjs", "on_message")
fn ffi_on_message(handler: fn(Dynamic) -> Nil) -> Nil
