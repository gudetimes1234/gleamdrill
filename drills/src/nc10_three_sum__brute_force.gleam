import gleam/int
import gleam/list

/// Every triple, checked. Sorting first means each triple comes out in
/// ascending order, so `list.unique` is enough to collapse the duplicates that
/// repeated values produce — no set needed.
pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  list.sort(nums, int.compare)
  |> triples([])
  |> list.reverse
  |> list.unique
}

fn triples(
  nums: List(Int),
  acc: List(#(Int, Int, Int)),
) -> List(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [a, ..rest] -> triples(rest, with_first(a, rest, acc))
  }
}

fn with_first(
  a: Int,
  nums: List(Int),
  acc: List(#(Int, Int, Int)),
) -> List(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [b, ..rest] ->
      with_first(
        a,
        rest,
        list.fold(rest, acc, fn(found, c) {
          case a + b + c == 0 {
            True -> [#(a, b, c), ..found]
            False -> found
          }
        }),
      )
  }
}
