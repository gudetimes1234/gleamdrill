import gleam/list
import gleam/string

pub fn check_inclusion(s1: String, s2: String) -> Bool {
  let needle =
    string.to_graphemes(s1)
    |> list.sort(string.compare)
  case needle {
    [] -> True
    _ -> windows(string.to_graphemes(s2), list.length(needle), needle)
  }
}

fn windows(haystack: List(String), size: Int, needle: List(String)) -> Bool {
  case list.length(haystack) < size {
    True -> False
    False ->
      case list.sort(list.take(haystack, size), string.compare) == needle {
        True -> True
        False -> windows(list.drop(haystack, 1), size, needle)
      }
  }
}
