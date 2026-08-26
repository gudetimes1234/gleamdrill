import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/string

pub fn is_match(s: String, p: String) -> Bool {
  let text = index(s)
  let pattern = index(p)
  let #(answer, _) =
    from(0, 0, string.length(s), string.length(p), text, pattern, dict.new())
  answer
}

/// A star binds to the character *before* it, so the pattern has to be read two
/// symbols at a time. Given "x*", either skip the pair entirely \u{2014} zero copies
/// \u{2014} or, if x matches here, consume one character of the text and stay on the
/// same pair. Everything else is a single-character match.
fn from(
  i: Int,
  j: Int,
  n: Int,
  m: Int,
  text: Dict(Int, String),
  pattern: Dict(Int, String),
  memo: Dict(#(Int, Int), Bool),
) -> #(Bool, Dict(#(Int, Int), Bool)) {
  case j >= m {
    True -> #(i >= n, memo)
    False ->
      case dict.get(memo, #(i, j)) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let here =
            i < n && { at(pattern, j) == at(text, i) || at(pattern, j) == "." }

          let #(answer, memo) = case at(pattern, j + 1) == "*" {
            True -> {
              let #(skipping, memo) = from(i, j + 2, n, m, text, pattern, memo)
              case skipping, here {
                True, _ -> #(True, memo)
                False, True -> from(i + 1, j, n, m, text, pattern, memo)
                False, False -> #(False, memo)
              }
            }
            False ->
              case here {
                True -> from(i + 1, j + 1, n, m, text, pattern, memo)
                False -> #(False, memo)
              }
          }
          #(answer, dict.insert(memo, #(i, j), answer))
        }
      }
  }
}

fn index(text: String) -> Dict(Int, String) {
  text
  |> string.to_graphemes
  |> list.index_map(fn(c, i) { #(i, c) })
  |> dict.from_list
}

fn at(lookup: Dict(Int, String), index: Int) -> String {
  result.unwrap(dict.get(lookup, index), "")
}
