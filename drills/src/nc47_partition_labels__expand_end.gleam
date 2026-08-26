import gleam/list
import gleam/string

pub fn partition_labels(s: String) -> List(Int) {
  cut(string.to_graphemes(s), [])
}

fn cut(rest: List(String), acc: List(Int)) -> List(Int) {
  case rest {
    [] -> list.reverse(acc)
    _ -> {
      let size = grow(rest, 1)
      cut(list.drop(rest, size), [size, ..acc])
    }
  }
}

/// Grow the piece one character at a time until nothing inside it also appears
/// in what is left. No last-position map \u{2014} the tail is asked directly \u{2014} which
/// is far slower but is the condition stated outright.
fn grow(rest: List(String), size: Int) -> Int {
  let prefix = list.take(rest, size)
  let tail = list.drop(rest, size)
  case list.any(prefix, fn(c) { list.contains(tail, c) }) {
    False -> size
    True -> grow(rest, size + 1)
  }
}
