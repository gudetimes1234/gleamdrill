import gleam/int
import gleam/list

pub fn min_cost_climbing_stairs(cost: List(Int)) -> Int {
  // Cost to stand on each step, carried forward: getting here means having
  // paid for one of the two steps below, whichever was cheaper. Two variables
  // again, because nothing older than two steps back can matter.
  let #(one_back, two_back) =
    list.fold(cost, #(0, 0), fn(state, price) {
      let #(one_back, two_back) = state
      #(price + int.min(one_back, two_back), one_back)
    })

  int.min(one_back, two_back)
}
