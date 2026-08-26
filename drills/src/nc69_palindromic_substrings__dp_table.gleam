import gleam/dict
import gleam/list
import gleam/result
import gleam/string

pub fn count_substrings(s: String) -> Int {
  let chars = string.to_graphemes(s)
  let n = list.length(chars)
  let lookup =
    list.index_fold(chars, dict.new(), fn(acc, c, i) { dict.insert(acc, i, c) })

  // The table says whether s[i..j] is a palindrome. It is when its ends match
  // and whatever is between them already was \u{2014} so the spans have to be filled
  // shortest first, which is the whole reason for the outer loop over length.
  let #(_, total) =
    list.fold(spans(n), #(dict.new(), 0), fn(state, span) {
      let #(table, total) = state
      let #(i, j) = span
      let ends_match = dict.get(lookup, i) == dict.get(lookup, j)
      let inside = case j - i < 2 {
        True -> True
        False -> result.unwrap(dict.get(table, #(i + 1, j - 1)), False)
      }
      let palindrome = ends_match && inside
      #(dict.insert(table, span, palindrome), case palindrome {
        True -> total + 1
        False -> total
      })
    })

  total
}

/// Every span, shortest first.
fn spans(n: Int) -> List(#(Int, Int)) {
  let indices = list.index_map(list.repeat(Nil, n), fn(_, i) { i })
  list.flat_map(indices, fn(length) {
    indices
    |> list.filter(fn(i) { i + length < n })
    |> list.map(fn(i) { #(i, i + length) })
  })
}
