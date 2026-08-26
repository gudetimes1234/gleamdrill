import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn longest_common_subsequence(text1: String, text2: String) -> Int {
  let a =
    string.to_graphemes(text1)
    |> list.index_map(fn(c, i) { #(i, c) })
    |> dict.from_list
  let b =
    string.to_graphemes(text2)
    |> list.index_map(fn(c, i) { #(i, c) })
    |> dict.from_list
  let #(answer, _) =
    from(0, 0, string.length(text1), string.length(text2), a, b, dict.new())
  answer
}

/// The same recurrence from the front, with a cache. Written this way the
/// choice is explicit \u{2014} match and advance both, or give up one character from
/// one side \u{2014} which the rolling row hides behind its indices.
fn from(
  i: Int,
  j: Int,
  n: Int,
  m: Int,
  a: Dict(Int, String),
  b: Dict(Int, String),
  memo: Dict(#(Int, Int), Int),
) -> #(Int, Dict(#(Int, Int), Int)) {
  case i >= n || j >= m {
    True -> #(0, memo)
    False ->
      case dict.get(memo, #(i, j)) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let #(best, memo) = case
            result.unwrap(dict.get(a, i), "")
            == result.unwrap(dict.get(b, j), "")
          {
            True -> {
              let #(rest, memo) = from(i + 1, j + 1, n, m, a, b, memo)
              #(rest + 1, memo)
            }
            False -> {
              let #(drop_a, memo) = from(i + 1, j, n, m, a, b, memo)
              let #(drop_b, memo) = from(i, j + 1, n, m, a, b, memo)
              #(int.max(drop_a, drop_b), memo)
            }
          }
          #(best, dict.insert(memo, #(i, j), best))
        }
      }
  }
}
