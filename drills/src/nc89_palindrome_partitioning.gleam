import gleam/list
import gleam/string

pub fn partition(s: String) -> List(List(String)) {
  build(string.to_graphemes(s))
}

/// Every partition starts with some palindromic prefix, so the choice at each
/// step is only how long that prefix is. Cutting there and recursing on the
/// rest reaches each partition exactly once, in order, with nothing to dedupe.
fn build(remaining: List(String)) -> List(List(String)) {
  case remaining {
    [] -> [[]]
    _ ->
      lengths(list.length(remaining))
      |> list.flat_map(fn(size) {
        let prefix = list.take(remaining, size)
        case prefix == list.reverse(prefix) {
          False -> []
          True ->
            build(list.drop(remaining, size))
            |> list.map(fn(rest) { [string.concat(prefix), ..rest] })
        }
      })
  }
}

fn lengths(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i + 1 })
}
