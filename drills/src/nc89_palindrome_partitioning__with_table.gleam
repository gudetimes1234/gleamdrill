import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/string

pub fn partition(s: String) -> List(List(String)) {
  let chars = string.to_graphemes(s)
  let n = list.length(chars)

  // Work out which spans are palindromes once, up front, rather than re-testing
  // the same prefix on every branch of the search. The search itself is then
  // pure choice: a table lookup replaces a linear scan at every step.
  let table = palindromes(chars, n)
  build(chars, 0, n, table)
}

fn build(
  chars: List(String),
  from: Int,
  n: Int,
  table: Dict(#(Int, Int), Bool),
) -> List(List(String)) {
  case from >= n {
    True -> [[]]
    False ->
      list.index_map(list.repeat(Nil, n - from), fn(_, i) { from + i })
      |> list.flat_map(fn(to) {
        case result.unwrap(dict.get(table, #(from, to)), False) {
          False -> []
          True -> {
            let piece =
              chars
              |> list.drop(from)
              |> list.take(to - from + 1)
              |> string.concat
            build(chars, to + 1, n, table)
            |> list.map(fn(rest) { [piece, ..rest] })
          }
        }
      })
  }
}

/// Shortest spans first, because a span is a palindrome only if the span inside
/// it already was.
fn palindromes(chars: List(String), n: Int) -> Dict(#(Int, Int), Bool) {
  let indices = list.index_map(list.repeat(Nil, n), fn(_, i) { i })

  list.flat_map(indices, fn(span) {
    indices
    |> list.filter(fn(i) { i + span < n })
    |> list.map(fn(i) { #(i, i + span) })
  })
  |> list.fold(dict.new(), fn(table, at) {
    let #(i, j) = at
    let inside = case j - i < 2 {
      True -> True
      False -> result.unwrap(dict.get(table, #(i + 1, j - 1)), False)
    }
    dict.insert(table, at, char_at(chars, i) == char_at(chars, j) && inside)
  })
}

fn char_at(chars: List(String), index: Int) -> String {
  chars |> list.drop(index) |> list.first |> result.unwrap("")
}
