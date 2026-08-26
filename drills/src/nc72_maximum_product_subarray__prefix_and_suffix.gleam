import gleam/int
import gleam/list

pub fn max_product(nums: List(Int)) -> Int {
  case nums {
    [] -> 0
    _ ->
      // A different argument entirely: the best subarray always runs to one end
      // of the block it sits in, because extending it towards the nearer end
      // would only multiply by more numbers, and the sign works out either
      // forwards or backwards. So sweeping running products from both
      // directions \u{2014} resetting at every zero \u{2014} is enough.
      int.max(sweep(nums), sweep(list.reverse(nums)))
  }
}

fn sweep(nums: List(Int)) -> Int {
  let #(_, best) =
    list.fold(nums, #(1, -2_147_483_648), fn(state, n) {
      let #(running, best) = state
      let running = case running {
        0 -> n
        _ -> running * n
      }
      #(running, int.max(best, running))
    })
  best
}
