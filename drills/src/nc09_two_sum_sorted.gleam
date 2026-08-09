import gleam/int
import gleam/list
import gleam/order

pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  search(numbers, list.reverse(numbers), 1, list.length(numbers), target)
}

fn search(
  from_left: List(Int),
  from_right: List(Int),
  lo: Int,
  hi: Int,
  target: Int,
) -> Result(#(Int, Int), Nil) {
  case from_left, from_right {
    [left, ..left_rest], [right, ..right_rest] ->
      case lo >= hi {
        True -> Error(Nil)
        False ->
          case int.compare(left + right, target) {
            order.Eq -> Ok(#(lo, hi))
            order.Lt -> search(left_rest, from_right, lo + 1, hi, target)
            order.Gt -> search(from_left, right_rest, lo, hi - 1, target)
          }
      }
    _, _ -> Error(Nil)
  }
}
