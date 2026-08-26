import gleam/int
import gleam/list

pub fn length_of_lis(nums: List(Int)) -> Int {
  // The longest subsequence ending at each position: one plus the best of every
  // earlier position holding a smaller value. Building the answers in order
  // means every "earlier position" is already known.
  let #(_, best) =
    list.fold(nums, #([], 0), fn(state, n) {
      let #(endings, best) = state
      let here =
        endings
        |> list.filter(fn(pair: #(Int, Int)) { pair.0 < n })
        |> list.map(fn(pair: #(Int, Int)) { pair.1 })
        |> list.fold(0, int.max)
        |> int.add(1)
      #([#(n, here), ..endings], int.max(best, here))
    })
  best
}
