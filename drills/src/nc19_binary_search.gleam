import gleam/int
import gleam/list
import gleam/order

pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  halve(nums, target, 0)
}

fn halve(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      case right {
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> halve(left, target, offset)
            order.Gt -> halve(after, target, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}
