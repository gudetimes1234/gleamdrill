import gleam/int
import gleam/list

pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  case k <= 0 {
    True -> []
    False -> windows(nums, k, [])
  }
}

/// Every window, maximised, by walking the list one start at a time. There is
/// no random access to slice with, so the tail is re-taken each step \u{2014} which is
/// the O(n\u{b7}k) the other variants exist to avoid.
fn windows(nums: List(Int), k: Int, acc: List(Int)) -> List(Int) {
  let window = list.take(nums, k)
  case list.length(window) < k, nums {
    True, _ -> list.reverse(acc)
    False, [] -> list.reverse(acc)
    False, [_, ..rest] ->
      case list.reduce(window, int.max) {
        Ok(best) -> windows(rest, k, [best, ..acc])
        Error(Nil) -> list.reverse(acc)
      }
  }
}
