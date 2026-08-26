import gleam/int
import gleam/list

pub fn rob(nums: List(Int)) -> Int {
  case nums {
    [] -> 0
    [only] -> only
    _ -> {
      // One pass carrying both stories at the same time: the run that is
      // allowed to take the first house, and the run that is not. Neither ever
      // looks at the other, so this is the two-pass version interleaved \u{2014}
      // useful when the input can only be walked once.
      let n = list.length(nums)
      let #(with_first, without_first) =
        list.index_fold(nums, #(#(0, 0), #(0, 0)), fn(state, value, i) {
          let #(with_first, without_first) = state
          #(
            case i == n - 1 {
              True -> with_first
              False -> step(with_first, value)
            },
            case i == 0 {
              True -> without_first
              False -> step(without_first, value)
            },
          )
        })

      int.max(with_first.0, without_first.0)
    }
  }
}

fn step(state: #(Int, Int), value: Int) -> #(Int, Int) {
  let #(best, previous) = state
  #(int.max(best, previous + value), best)
}
