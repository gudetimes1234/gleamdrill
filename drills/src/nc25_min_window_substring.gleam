import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn min_window(s: String, t: String) -> String {
  case t == "" || s == "" {
    True -> ""
    False -> {
      let graphemes = string.to_graphemes(s)
      let need =
        list.fold(string.to_graphemes(t), dict.new(), fn(counts, c) {
          dict.insert(counts, c, count(counts, c) + 1)
        })
      let #(start, length) =
        scan(graphemes, 0, graphemes, 0, need, string.length(t), #(0, 0))
      string.slice(s, start, length)
    }
  }
}

/// The window is the gap between two views of the same list: `right` is what
/// has not been taken in yet, `left` is everything from the window's start
/// onwards. Advancing either end is one list head, and the indices are carried
/// alongside because the answer is a slice.
fn scan(
  right: List(String),
  right_index: Int,
  left: List(String),
  left_index: Int,
  counts: Dict(String, Int),
  missing: Int,
  best: #(Int, Int),
) -> #(Int, Int) {
  case missing == 0 {
    True ->
      case left {
        [] -> best
        [c, ..left_rest] -> {
          let length = right_index - left_index
          let best = case best.1 == 0 || length < best.1 {
            True -> #(left_index, length)
            False -> best
          }
          let raised = count(counts, c) + 1
          scan(
            right,
            right_index,
            left_rest,
            left_index + 1,
            dict.insert(counts, c, raised),
            case raised > 0 {
              True -> missing + 1
              False -> missing
            },
            best,
          )
        }
      }
    False ->
      case right {
        [] -> best
        [c, ..right_rest] -> {
          let current = count(counts, c)
          scan(
            right_rest,
            right_index + 1,
            left,
            left_index,
            dict.insert(counts, c, current - 1),
            case current > 0 {
              True -> missing - 1
              False -> missing
            },
            best,
          )
        }
      }
  }
}

fn count(counts: Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}
