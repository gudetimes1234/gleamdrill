//// `gleam run -m check_patterns [stem ...]`: validate the Line Drill content
//// without writing any generated file. Given stems, only those problems are
//// checked, so one author's half-written file does not stop another's.

import generate
import gleam/list
import gleam/string

pub fn main() {
  args()
  |> string.split(" ")
  |> list.filter(fn(arg) { arg != "" })
  |> generate.check_patterns
}

@external(javascript, "./check_patterns_ffi.mjs", "args")
fn args() -> String
