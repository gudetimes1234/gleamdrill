import gleam/int
import gleam/list

pub fn max_sub_array(nums: List(Int)) -> Int {
  case nums {
    [] -> 0
    [first, ..rest] -> {
      // Kadane: at each position the best subarray ending here either extends
      // the one ending just before it or starts fresh. A running total that has
      // gone negative can only hurt whatever follows, so it is dropped.
      let #(_, best) =
        list.fold(rest, #(first, first), fn(state, n) {
          let #(here, best) = state
          let here = int.max(n, here + n)
          #(here, int.max(best, here))
        })
      best
    }
  }
}
