import gleam/int
import gleam/list

pub fn rob(nums: List(Int)) -> Int {
  // The circle only matters through one constraint: the first and last houses
  // are neighbours, so at most one of them is robbed. Ruling each out in turn
  // leaves two ordinary straight-line problems, and the answer is the better.
  case nums {
    [] -> 0
    [only] -> only
    _ ->
      int.max(
        straight(list.drop(nums, 1)),
        straight(list.take(nums, list.length(nums) - 1)),
      )
  }
}

fn straight(nums: List(Int)) -> Int {
  let #(best, _) =
    list.fold(nums, #(0, 0), fn(state, value) {
      let #(best, previous) = state
      #(int.max(best, previous + value), best)
    })
  best
}
