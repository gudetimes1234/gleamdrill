import gleam/list
import gleam/string

pub fn strip_comment(line: String) -> String {
  case line {
    "# " <> rest -> rest
    "#" <> rest -> rest
    _ -> line
  }
}

pub fn initials(name: String) -> String {
  name
  |> string.split(" ")
  |> list.filter_map(fn(word) { list.first(string.to_graphemes(word)) })
  |> string.concat
  |> string.uppercase
}
