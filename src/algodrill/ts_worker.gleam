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

fn serve(request: Request) -> Promise(Nil) {
  case unsupported_syntax(request.solution) {
    Some(reason) -> {
      post_error(request.id, "compile", None, None, None, reason)
      promise.resolve(Nil)
    }
    None -> compile_and_run(request)
  }
}

/// Line-level scan for the two constructs sucrase gets silently wrong.
fn unsupported_syntax(source: String) -> Option(String) {
  let lines = list.map(string.split(source, "\n"), string.trim)
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
      )
      promise.resolve(Nil)
    }
    Ok(solution_js) ->
      case transform(request.harness) {
        Error(#(message, _, _)) -> {
          post_error(
            request.id,
            "compile",
            Some("check.ts"),
            None,
            None,
            message,
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

          use outcome <- promise.await(ffi_import_and_run(check_url))
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
    decode.success(Error(message))
  }
  case decode.run(outcome, decode.one_of(ran, [failed])) {
    Ok(Ok(cases)) -> post_result(id, cases)
    Ok(Error(message)) ->
      case string.contains(message, "__signature_mismatch__") {
        True ->
          post_error(
            id,
            "run",
            Some("check.ts"),
            None,
            None,
            "The expected function isn't exported.",
          )
        False -> post_error(id, "run", None, None, None, message)
      }
    Error(_) ->
      post_error(
        id,
        "run",
        None,
        None,
        None,
        "The harness produced an unreadable result.",
      )
  }
}

fn post_result(id: Int, cases: List(#(String, String, String))) -> Nil {
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
fn ffi_import_and_run(url: String) -> Promise(Dynamic)

@external(javascript, "./ts_worker_ffi.mjs", "post_json")
fn ffi_post_json(payload: String) -> Nil

@external(javascript, "./ts_worker_ffi.mjs", "on_message")
fn ffi_on_message(handler: fn(Dynamic) -> Nil) -> Nil
