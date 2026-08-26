import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn longest_palindrome(s: String) -> String {
  let chars = string.to_graphemes(s)
  let n = list.length(chars)
  let lookup =
    list.index_fold(chars, dict.new(), fn(acc, c, i) { dict.insert(acc, i, c) })

  // Every palindrome has a centre, and there are only 2n of them \u{2014} n single
  // characters and n gaps between them. Growing outwards from each is O(n\u{b2})
  // total and needs no table.
  let #(start, length) =
    list.fold(centres(n), #(0, 0), fn(best, centre) {
      let found = expand(lookup, n, centre.0, centre.1)
      case found.1 > best.1 {
        True -> found
        False -> best
      }
    })

  string.slice(s, start, length)
}

fn centres(n: Int) -> List(#(Int, Int)) {
  list.repeat(Nil, n)
  |> list.index_map(fn(_, i) { i })
  |> list.flat_map(fn(i) { [#(i, i), #(i, i + 1)] })
}

/// Widens while the ends match, then reports where it stopped as a start and a
/// length. The two pointers have gone one step too far by then, which is where
/// the +1 and the -1 come from.
fn expand(
  lookup: Dict(Int, String),
  n: Int,
  left: Int,
  right: Int,
) -> #(Int, Int) {
  case
    left >= 0 && right < n && dict.get(lookup, left) == dict.get(lookup, right)
  {
    True -> expand(lookup, n, left - 1, right + 1)
    False -> #(left + 1, right - left - 1)
  }
}
