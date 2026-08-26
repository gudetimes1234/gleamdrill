import gleam/list
import gleam/string

const separator = "|"

const escape = "\\"

pub fn encode(strs: List(String)) -> String {
  strs
  |> list.map(fn(s) {
    separator
    <> s
    |> string.replace(escape, escape <> escape)
    |> string.replace(separator, escape <> separator)
  })
  |> string.concat
}

pub fn decode(s: String) -> List(String) {
  // The leading separator is what tells [] and [""] apart: one encodes to the
  // empty string, the other to a lone separator.
  case string.to_graphemes(s) {
    [] -> []
    [first, ..rest] if first == separator -> unescape(rest, "", [])
    _ -> []
  }
}

fn unescape(
  graphemes: List(String),
  current: String,
  acc: List(String),
) -> List(String) {
  case graphemes {
    [] -> list.reverse([current, ..acc])
    [first, escaped, ..rest] if first == escape ->
      unescape(rest, current <> escaped, acc)
    [first, ..rest] if first == separator -> unescape(rest, "", [current, ..acc])
    [g, ..rest] -> unescape(rest, current <> g, acc)
  }
}
