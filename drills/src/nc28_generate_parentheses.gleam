import gleam/list

pub fn generate_parenthesis(n: Int) -> List(String) {
  list.reverse(build(n, n, "", []))
}

/// Two counters, one rule each: an opener is legal while any are left, and a
/// closer is legal only while more are outstanding than openers. Every string
/// reached with both counters at zero is valid by construction, so nothing is
/// ever generated and then thrown away.
fn build(
  open: Int,
  close: Int,
  current: String,
  acc: List(String),
) -> List(String) {
  case open, close {
    0, 0 -> [current, ..acc]
    _, _ -> {
      let acc = case open > 0 {
        True -> build(open - 1, close, current <> "(", acc)
        False -> acc
      }
      case close > open {
        True -> build(open, close - 1, current <> ")", acc)
        False -> acc
      }
    }
  }
}
