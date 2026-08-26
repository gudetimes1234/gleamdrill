import gleam/dict
import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn partition_labels(s: String) -> List(Int) {
  let graphemes = string.to_graphemes(s)
  // Overwriting as we go leaves each character mapped to its last position.
  let last =
    list.index_fold(graphemes, dict.new(), fn(acc, c, i) {
      dict.insert(acc, c, i)
    })

  // A piece can only end where every character it contains has run out. Extend
  // the end to the furthest last-position seen so far; when the walk catches
  // up with it, the piece is closed.
  let #(parts, _, _) =
    list.index_fold(graphemes, #([], 0, -1), fn(state, c, i) {
      let #(parts, start, end) = state
      let end = int.max(end, result.unwrap(dict.get(last, c), i))
      case i == end {
        True -> #([end - start + 1, ..parts], i + 1, end)
        False -> #(parts, start, end)
      }
    })

  list.reverse(parts)
}
