import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/string

pub fn num_distinct(s: String, t: String) -> Int {
  let source = index(s)
  let target = index(t)
  let #(count, _) =
    from(0, 0, string.length(s), string.length(t), source, target, dict.new())
  count
}

/// The choice written out: when the characters match, either use this source
/// character for this target character or skip it; when they do not, skipping
/// is the only option. Running out of target is one complete subsequence, which
/// is why the base case is 1 rather than 0.
fn from(
  i: Int,
  j: Int,
  n: Int,
  m: Int,
  source: Dict(Int, String),
  target: Dict(Int, String),
  memo: Dict(#(Int, Int), Int),
) -> #(Int, Dict(#(Int, Int), Int)) {
  case j >= m, i >= n {
    True, _ -> #(1, memo)
    _, True -> #(0, memo)
    _, _ ->
      case dict.get(memo, #(i, j)) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let #(skipping, memo) = from(i + 1, j, n, m, source, target, memo)
          let #(using, memo) = case at(source, i) == at(target, j) {
            True -> from(i + 1, j + 1, n, m, source, target, memo)
            False -> #(0, memo)
          }
          #(skipping + using, dict.insert(memo, #(i, j), skipping + using))
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
