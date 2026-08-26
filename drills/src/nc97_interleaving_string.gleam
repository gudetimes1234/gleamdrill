import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/string

pub fn is_interleave(s1: String, s2: String, s3: String) -> Bool {
  case string.length(s1) + string.length(s2) == string.length(s3) {
    False -> False
    True -> {
      let a = index(s1)
      let b = index(s2)
      let c = index(s3)
      let #(answer, _) =
        from(0, 0, string.length(s1), string.length(s2), a, b, c, dict.new())
      answer
    }
  }
}

/// How much of each source has been used is the entire state \u{2014} the position
/// in the target is their sum, so it never has to be tracked. That collapse
/// from three indices to two is what makes the table two-dimensional.
fn from(
  i: Int,
  j: Int,
  n: Int,
  m: Int,
  a: Dict(Int, String),
  b: Dict(Int, String),
  c: Dict(Int, String),
  memo: Dict(#(Int, Int), Bool),
) -> #(Bool, Dict(#(Int, Int), Bool)) {
  case i >= n && j >= m {
    True -> #(True, memo)
    False ->
      case dict.get(memo, #(i, j)) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let target = at(c, i + j)
          let #(from_a, memo) = case i < n && at(a, i) == target {
            True -> from(i + 1, j, n, m, a, b, c, memo)
            False -> #(False, memo)
          }
          let #(answer, memo) = case from_a {
            True -> #(True, memo)
            False ->
              case j < m && at(b, j) == target {
                True -> from(i, j + 1, n, m, a, b, c, memo)
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
