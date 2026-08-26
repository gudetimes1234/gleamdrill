import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn num_decodings(s: String) -> Int {
  let chars = string.to_graphemes(s)
  case chars {
    [] -> 0
    _ -> {
      let lookup =
        list.index_fold(chars, dict.new(), fn(acc, c, i) {
          dict.insert(acc, i, c)
        })
      let #(ways, _) = from(0, list.length(chars), lookup, dict.new())
      ways
    }
  }
}

/// The same two choices as a recursion from the front: take one character, or
/// take two if they read as 10 to 26. Reaching the end is one complete
/// decoding, which is why the base case returns 1 rather than 0.
fn from(
  index: Int,
  n: Int,
  lookup: Dict(Int, String),
  memo: Dict(Int, Int),
) -> #(Int, Dict(Int, Int)) {
  case index >= n {
    True -> #(1, memo)
    False ->
      case dict.get(memo, index) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let here = at(lookup, index)
          case here == "0" {
            True -> #(0, dict.insert(memo, index, 0))
            False -> {
              let #(alone, memo) = from(index + 1, n, lookup, memo)
              let #(paired, memo) = case
                index + 1 < n && legal_pair(here, at(lookup, index + 1))
              {
                True -> from(index + 2, n, lookup, memo)
                False -> #(0, memo)
              }
              #(alone + paired, dict.insert(memo, index, alone + paired))
            }
          }
        }
      }
  }
}

fn at(lookup: Dict(Int, String), index: Int) -> String {
  result.unwrap(dict.get(lookup, index), "")
}

fn legal_pair(first: String, second: String) -> Bool {
  let value = result.unwrap(int.parse(first <> second), 0)
  value >= 10 && value <= 26
}
