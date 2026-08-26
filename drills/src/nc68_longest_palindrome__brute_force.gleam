import gleam/list
import gleam/string

pub fn longest_palindrome(s: String) -> String {
  let n = string.length(s)

  substrings(n)
  |> list.fold("", fn(best, span) {
    let candidate = string.slice(s, span.0, span.1)
    case span.1 > string.length(best) && is_palindrome(candidate) {
      True -> candidate
      False -> best
    }
  })
}

/// Every start with every length, longest length first within each start so
/// that the first improvement found at a given start is the best one there.
fn substrings(n: Int) -> List(#(Int, Int)) {
  let indices = list.index_map(list.repeat(Nil, n), fn(_, i) { i })
  list.flat_map(indices, fn(start) {
    list.index_map(list.repeat(Nil, n - start), fn(_, i) { #(start, i + 1) })
  })
}

fn is_palindrome(text: String) -> Bool {
  let chars = string.to_graphemes(text)
  chars == list.reverse(chars)
}
