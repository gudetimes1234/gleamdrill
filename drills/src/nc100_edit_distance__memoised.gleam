import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn min_distance(word1: String, word2: String) -> Int {
  let a = index(word1)
  let b = index(word2)
  let #(cost, _) =
    from(0, 0, string.length(word1), string.length(word2), a, b, dict.new())
  cost
}

/// The same three edits as an explicit choice from the front. Running out of
/// one word costs whatever is left of the other, since every remaining
/// character has to be inserted or deleted.
fn from(
  i: Int,
  j: Int,
  n: Int,
  m: Int,
  a: Dict(Int, String),
  b: Dict(Int, String),
  memo: Dict(#(Int, Int), Int),
) -> #(Int, Dict(#(Int, Int), Int)) {
  case i >= n, j >= m {
    True, _ -> #(m - j, memo)
    _, True -> #(n - i, memo)
    _, _ ->
      case dict.get(memo, #(i, j)) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) ->
          case at(a, i) == at(b, j) {
            True -> from(i + 1, j + 1, n, m, a, b, memo)
            False -> {
              let #(replace, memo) = from(i + 1, j + 1, n, m, a, b, memo)
              let #(delete, memo) = from(i + 1, j, n, m, a, b, memo)
              let #(insert, memo) = from(i, j + 1, n, m, a, b, memo)
              let best = 1 + int.min(replace, int.min(delete, insert))
              #(best, dict.insert(memo, #(i, j), best))
            }
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
