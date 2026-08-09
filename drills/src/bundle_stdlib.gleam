//// Emits ../assets/gleam-runtime/<version>/stdlib.js: the Gleam stdlib SOURCE keyed
//// by module name. The wasm compiler has no dependency support, so the app's worker
//// writes these sources into the compiler's virtual filesystem before each session.
////
//// Run from drills/: `gleam run -m bundle_stdlib`

import gleam/int
import gleam/io
import gleam/list
import gleam/string
import simplifile

/// Must match GLEAM_VERSION in the repo Makefile.
const runtime_version = "1.18.1"

const stdlib_src = "../build/packages/gleam_stdlib/src"

pub fn main() {
  let assert Ok(files) = simplifile.get_files(stdlib_src <> "/gleam")
  let modules =
    files
    |> list.filter(string.ends_with(_, ".gleam"))
    |> list.map(module_entry)
    |> list.sort(fn(a, b) { string.compare(a.0, b.0) })

  let body =
    modules
    |> list.map(fn(entry) { "  \"" <> entry.0 <> "\": `" <> entry.1 <> "`," })
    |> string.join("\n")

  let out_path = "../assets/gleam-runtime/" <> runtime_version <> "/stdlib.js"
  let assert Ok(Nil) =
    simplifile.write(out_path, "export default {\n" <> body <> "\n};\n")

  io.println(
    "stdlib.js: "
    <> int.to_string(list.length(modules))
    <> " modules -> "
    <> out_path,
  )
}

fn module_entry(path: String) -> #(String, String) {
  let assert Ok(source) = simplifile.read(path)
  let assert [_, relative] = string.split(path, "/src/")
  let name = string.drop_end(relative, string.length(".gleam"))
  #(name, escape_template_literal(strip(source)))
}

/// Comments and blank lines are dead weight in the compiler's virtual filesystem;
/// dropping them takes the bundle from ~250KB to ~100KB.
fn strip(source: String) -> String {
  source
  |> string.split("\n")
  |> list.filter(fn(line) {
    let trimmed = string.trim(line)
    trimmed != "" && !string.starts_with(trimmed, "//")
  })
  |> string.join("\n")
}

fn escape_template_literal(source: String) -> String {
  source
  |> string.replace("\\", "\\\\")
  |> string.replace("`", "\\`")
  |> string.replace("$", "\\$")
}
