import gleam/int
import gleam/list

pub fn rob(nums: List(Int)) -> Int {
  // At each house the choice is take it and add what was safe two houses back,
  // or skip it and keep the best so far. Both answers are one number, so the
  // whole table collapses to a pair.
  let #(best, _) =
    list.fold(nums, #(0, 0), fn(state, value) {
      let #(best, previous) = state
      #(int.max(best, previous + value), best)
    })
  best
}
