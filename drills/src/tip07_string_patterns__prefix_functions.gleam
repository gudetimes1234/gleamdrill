import gleam/list
import gleam/string

/// The same work with functions rather than string patterns. Patterns bind the
/// remainder for free, which is why they win for prefixes; these read better
/// when the test and the surgery are separate ideas.
pub fn strip_comment(line: String) -> String {
  case string.starts_with(line, "#") {
    True -> line |> string.drop_start(1) |> string.trim_start
    False -> line
  }
}

pub fn initials(name: String) -> String {
  name
  |> string.split(" ")
  |> list.map(fn(word) { string.slice(word, 0, 1) })
  |> string.concat
  |> string.uppercase
}
