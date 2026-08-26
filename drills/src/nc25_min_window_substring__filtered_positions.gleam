import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn min_window(s: String, t: String) -> String {
  case t == "" || s == "" {
    True -> ""
    False -> {
      let need = tally(string.to_graphemes(t))
      // Only the positions that could possibly matter. For a long haystack and
      // a short needle this is a far shorter walk than the whole string.
      let positions =
        string.to_graphemes(s)
        |> list.index_map(fn(c, i) { #(i, c) })
        |> list.filter(fn(entry) { dict.has_key(need, entry.1) })

      case
        scan(positions, positions, need, dict.new(), 0, dict.size(need), -1, #(
          0,
          0,
        ))
      {
        #(_, 0) -> ""
        #(start, length) -> string.slice(s, start, length)
      }
    }
  }
}

/// Counts how many of the needle's distinct characters are fully covered,
/// rather than how many characters are still missing. Same window, different
/// bookkeeping: `satisfied` only moves when a count crosses its requirement.
fn scan(
  right: List(#(Int, String)),
  left: List(#(Int, String)),
  need: Dict(String, Int),
  window: Dict(String, Int),
  satisfied: Int,
  distinct: Int,
  last_index: Int,
  best: #(Int, Int),
) -> #(Int, Int) {
  case satisfied == distinct {
    True ->
      case left {
        [] -> best
        [#(start, c), ..left_rest] -> {
          let length = last_index - start + 1
          let best = case best.1 == 0 || length < best.1 {
            True -> #(start, length)
            False -> best
          }
          let lowered = count(window, c) - 1
          scan(
            right,
            left_rest,
            need,
            dict.insert(window, c, lowered),
            case lowered < count(need, c) {
              True -> satisfied - 1
              False -> satisfied
            },
            distinct,
            last_index,
            best,
          )
        }
      }
    False ->
      case right {
        [] -> best
        [#(index, c), ..right_rest] -> {
          let raised = count(window, c) + 1
          scan(
            right_rest,
            left,
            need,
            dict.insert(window, c, raised),
            case raised == count(need, c) {
              True -> satisfied + 1
              False -> satisfied
            },
            distinct,
            index,
            best,
          )
        }
      }
  }
}

fn tally(graphemes: List(String)) -> Dict(String, Int) {
  list.fold(graphemes, dict.new(), fn(counts, c) {
    dict.insert(counts, c, count(counts, c) + 1)
  })
}

fn count(counts: Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}
