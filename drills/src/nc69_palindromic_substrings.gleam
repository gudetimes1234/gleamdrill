import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn count_substrings(s: String) -> Int {
  let chars = string.to_graphemes(s)
  let n = list.length(chars)
  let lookup =
    list.index_fold(chars, dict.new(), fn(acc, c, i) { dict.insert(acc, i, c) })

  // Same 2n centres as finding the longest one, except that here every
  // successful widening is itself an answer, so the count is how many times the
  // expansion succeeded rather than how far it got.
  list.repeat(Nil, n)
  |> list.index_map(fn(_, i) { i })
  |> list.fold(0, fn(total, i) {
    total + grow(lookup, n, i, i) + grow(lookup, n, i, i + 1)
  })
}

fn grow(lookup: Dict(Int, String), n: Int, left: Int, right: Int) -> Int {
  case
    left >= 0 && right < n && dict.get(lookup, left) == dict.get(lookup, right)
  {
    True -> 1 + grow(lookup, n, left - 1, right + 1)
    False -> 0
  }
}
