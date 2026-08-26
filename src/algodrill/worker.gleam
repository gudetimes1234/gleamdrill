//// The compile-and-run web worker, in the style of tour.gleam.run.
////
//// Per run it compiles two modules — `solution` (what the user typed) and `check`
//// (the drill's harness, which imports solution) — then executes the harness and
//// reports per-case pass/fail. Compiled ES modules are executed via data: URLs,
//// whose opaque base URL cannot resolve relative imports; every specifier is
//// therefore rewritten to an absolute URL first, and check's import of solution
//// becomes a nested data: URL.
////
//// Relies on dynamic import() of data: URLs — a strict script-src CSP would break
//// this; the site sets no CSP.

import gleam/dynamic.{type Dynamic}
import gleam/dynamic/decode.{type Decoder}
import gleam/int
import gleam/javascript/promise.{type Promise}
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string

/// Fallback when the spawning page passes no ?v= query. Must match GLEAM_VERSION
/// in the Makefile.
const default_version = "1.18.1"

/// One compiler project, reused for every run: write_module overwrites, so the
/// stdlib write cost is paid once per worker lifetime.
const project = 0

/// Opaque handle to the wasm compiler's module namespace.
pub type Compiler

pub type Request {
  Request(id: Int, solution: String, harness: String)
}

pub fn main() -> Promise(Nil) {
  let base = ffi_resolve("./gleam-runtime/" <> runtime_version() <> "/")
  let precompiled = base <> "precompiled/"

  use compiler <- promise.await(ffi_load_compiler(base))
  use _ <- promise.await(ffi_write_stdlib(compiler, base, project))
  ffi_post_json(json.to_string(json.object([#("type", json.string("ready"))])))

  ffi_on_message(fn(data) {
    case decode.run(data, request_decoder()) {
      Ok(request) -> {
        let _ = serve(compiler, precompiled, request)
        Nil
      }
      Error(_) -> Nil
    }
  })
  promise.resolve(Nil)
}

fn runtime_version() -> String {
  ffi_self_search()
  |> string.drop_start(1)
  |> string.split("&")
  |> list.find_map(fn(pair) {
    case pair {
      "v=" <> version if version != "" -> Ok(version)
      _ -> Error(Nil)
    }
  })
  |> result.unwrap(default_version)
}

fn request_decoder() -> decode.Decoder(Request) {
  use kind <- decode.field("type", decode.string)
  use id <- decode.field("id", decode.int)
  use solution <- decode.field("solution", decode.string)
  use harness <- decode.field("harness", decode.string)
  case kind {
    "run" -> decode.success(Request(id, solution, harness))
    _ -> decode.failure(Request(0, "", ""), "Request")
  }
}

fn serve(
  compiler: Compiler,
  precompiled: String,
  request: Request,
) -> Promise(Nil) {
  ffi_write_module(compiler, project, "solution", request.solution)
  ffi_write_module(compiler, project, "check", request.harness)
  ffi_reset_warnings(compiler, project)

  case ffi_compile(compiler, project) {
    "" -> {
      let solution_url =
        ffi_read_js(compiler, project, "solution")
        |> rewrite_imports(precompiled)
        |> ffi_to_data_url

      let check_url =
        ffi_read_js(compiler, project, "check")
        |> string.replace(
          "from \"./solution.mjs\"",
          "from \"" <> solution_url <> "\"",
        )
        |> rewrite_imports(precompiled)
        |> ffi_to_data_url

      use outcome <- promise.await(ffi_import_and_run(check_url))
      post(request.id, decode_outcome(outcome), drain_warnings(compiler, []))
      promise.resolve(Nil)
    }

    diagnostic -> {
      post(
        request.id,
        Failed("compile", diagnostic, ""),
        drain_warnings(compiler, []),
      )
      promise.resolve(Nil)
    }
  }
}

/// Every relative specifier the compiler emits starts `from "./`; pointing them at
/// the precompiled stdlib directory is a plain textual replace. Data: URLs inserted
/// beforehand are untouched because they no longer match.
fn rewrite_imports(js: String, precompiled: String) -> String {
  string.replace(js, "from \"./", "from \"" <> precompiled)
}

type Outcome {
  Ran(cases: List(#(String, String, String)), stdout: String)
  Failed(phase: String, message: String, stdout: String)
}

fn decode_outcome(outcome: Dynamic) -> Outcome {
  let case_decoder = {
    use label <- decode.field("label", decode.string)
    use expected <- decode.field("expected", decode.string)
    use actual <- decode.field("actual", decode.string)
    decode.success(#(label, expected, actual))
  }
  let ran = {
    use cases <- decode.field("cases", decode.list(case_decoder))
    use stdout <- stdout_field()
    decode.success(Ran(cases, stdout))
  }
  let failed = {
    use message <- decode.field("error", decode.string)
    use stdout <- stdout_field()
    decode.success(Failed("run", message, stdout))
  }
  case decode.run(outcome, decode.one_of(ran, [failed])) {
    Ok(decoded) -> decoded
    Error(_) -> Failed("run", "The harness produced an unreadable result.", "")
  }
}

/// Capped here rather than in the view: a print inside a hot loop must not get
/// as far as postMessage, let alone the DOM.
fn stdout_field(next: fn(String) -> Decoder(a)) -> Decoder(a) {
  use text <- decode.optional_field("stdout", "", decode.string)
  next(truncate(text, 4000))
}

fn truncate(text: String, max: Int) -> String {
  case string.length(text) > max {
    True -> string.slice(text, 0, max) <> "\u{2026}"
    False -> text
  }
}

fn drain_warnings(compiler: Compiler, acc: List(String)) -> List(String) {
  case ffi_pop_warning(compiler, project) {
    "" -> list.reverse(acc)
    warning -> drain_warnings(compiler, [string.trim_start(warning), ..acc])
  }
}

fn post(id: Int, outcome: Outcome, warnings: List(String)) -> Nil {
  let warnings_json = #("warnings", json.array(warnings, json.string))
  let payload = case outcome {
    Ran(cases, stdout) ->
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
        warnings_json,
      ])
    Failed(phase, message, stdout) -> {
      let location = locate(message)
      json.object([
        #("type", json.string("error")),
        #("id", json.int(id)),
        #("phase", json.string(phase)),
        #("file", nullable_string(option.map(location, fn(l) { l.0 }))),
        #("line", nullable_int(option.map(location, fn(l) { l.1 }))),
        #("column", nullable_int(option.map(location, fn(l) { l.2 }))),
        #("message", json.string(message)),
        #("stdout", json.string(stdout)),
        warnings_json,
      ])
    }
  }
  ffi_post_json(json.to_string(payload))
}

/// Compiler diagnostics carry their position only as text:
/// `┌─ /src/check.gleam:7:37`. Extract (file, line, column) from the first one.
fn locate(diagnostic: String) -> Option(#(String, Int, Int)) {
  case string.split(diagnostic, "\u{250c}\u{2500} /src/") {
    [_, after, ..] -> {
      let position =
        after
        |> string.split("\n")
        |> list.first
        |> result.unwrap("")
        |> string.trim
      case string.split(position, ":") {
        [file, line, column, ..] ->
          case int.parse(line), int.parse(column) {
            Ok(line), Ok(column) -> Some(#(file, line, column))
            _, _ -> None
          }
        _ -> None
      }
    }
    _ -> None
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

@external(javascript, "./worker_ffi.mjs", "resolve")
fn ffi_resolve(relative: String) -> String

@external(javascript, "./worker_ffi.mjs", "self_search")
fn ffi_self_search() -> String

@external(javascript, "./worker_ffi.mjs", "load_compiler")
fn ffi_load_compiler(base: String) -> Promise(Compiler)

@external(javascript, "./worker_ffi.mjs", "write_stdlib")
fn ffi_write_stdlib(
  compiler: Compiler,
  base: String,
  project: Int,
) -> Promise(Nil)

@external(javascript, "./worker_ffi.mjs", "write_module")
fn ffi_write_module(
  compiler: Compiler,
  project: Int,
  name: String,
  code: String,
) -> Nil

@external(javascript, "./worker_ffi.mjs", "compile")
fn ffi_compile(compiler: Compiler, project: Int) -> String

@external(javascript, "./worker_ffi.mjs", "read_js")
fn ffi_read_js(compiler: Compiler, project: Int, name: String) -> String

@external(javascript, "./worker_ffi.mjs", "reset_warnings")
fn ffi_reset_warnings(compiler: Compiler, project: Int) -> Nil

@external(javascript, "./worker_ffi.mjs", "pop_warning")
fn ffi_pop_warning(compiler: Compiler, project: Int) -> String

@external(javascript, "./worker_ffi.mjs", "to_data_url")
fn ffi_to_data_url(js: String) -> String

@external(javascript, "./worker_ffi.mjs", "import_and_run")
fn ffi_import_and_run(url: String) -> Promise(Dynamic)

@external(javascript, "./worker_ffi.mjs", "post_json")
fn ffi_post_json(payload: String) -> Nil

@external(javascript, "./worker_ffi.mjs", "on_message")
fn ffi_on_message(handler: fn(Dynamic) -> Nil) -> Nil
