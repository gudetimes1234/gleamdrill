import gleam/int
import gleam/list
import gleam/order

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  // Sorting loses the original positions, so carry them along.
  let sorted =
    nums
    |> list.index_map(fn(n, i) { #(n, i) })
    |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  converge(sorted, list.reverse(sorted), list.length(sorted), target)
}

/// Walk one pointer in from each end: too small means the low end must rise,
/// too large means the high end must fall.
fn converge(
  from_left: List(#(Int, Int)),
  from_right: List(#(Int, Int)),
  remaining: Int,
  target: Int,
) -> Result(#(Int, Int), Nil) {
  case remaining < 2 {
    True -> Error(Nil)
    False ->
      case from_left, from_right {
        [#(low, i), ..left_rest], [#(high, j), ..right_rest] ->
          case int.compare(low + high, target) {
            order.Eq -> Ok(#(int.min(i, j), int.max(i, j)))
            order.Lt -> converge(left_rest, from_right, remaining - 1, target)
            order.Gt -> converge(from_left, right_rest, remaining - 1, target)
          }
        _, _ -> Error(Nil)
      }
  }
}
