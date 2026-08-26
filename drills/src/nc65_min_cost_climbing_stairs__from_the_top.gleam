import gleam/int
import gleam/list

pub fn min_cost_climbing_stairs(cost: List(Int)) -> Int {
  // The same recurrence read the other way: instead of "what did it cost to
  // get here", ask "what will it cost to finish from here". Walking the list
  // backwards, the answer at each step is its own price plus the cheaper of the
  // two ahead, and the start is the better of the first two.
  let #(one_ahead, two_ahead) =
    cost
    |> list.reverse
    |> list.fold(#(0, 0), fn(state, price) {
      let #(one_ahead, two_ahead) = state
      #(price + int.min(one_ahead, two_ahead), one_ahead)
    })

  int.min(one_ahead, two_ahead)
}
