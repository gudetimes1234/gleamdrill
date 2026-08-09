import gleam/int
import gleam/list
import gleam/order
import gleam/set

pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  let sorted = list.sort(nums, int.compare)
  outer(sorted, set.new())
  |> set.to_list
}

fn outer(
  nums: List(Int),
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [first, ..rest] ->
      outer(
        rest,
        inner(first, rest, list.reverse(rest), list.length(rest), acc),
      )
  }
}

fn inner(
  first: Int,
  from_left: List(Int),
  from_right: List(Int),
  remaining: Int,
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case remaining < 2 {
    True -> acc
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] ->
          case int.compare(first + left + right, 0) {
            order.Eq ->
              inner(
                first,
                left_rest,
                from_right,
                remaining - 1,
                set.insert(acc, #(first, left, right)),
              )
            order.Lt -> inner(first, left_rest, from_right, remaining - 1, acc)
            order.Gt -> inner(first, from_left, right_rest, remaining - 1, acc)
          }
        _, _ -> acc
      }
  }
}
