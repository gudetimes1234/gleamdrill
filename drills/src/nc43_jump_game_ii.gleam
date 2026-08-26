import gleam/int
import gleam/list

pub fn jump(nums: List(Int)) -> Int {
  let n = list.length(nums)
  // Breadth-first search without a queue. Everything reachable in k jumps forms
  // a contiguous window; when the walk reaches that window's end, one more jump
  // is spent and the next window runs to the furthest index seen so far.
  let #(jumps, _, _) =
    nums
    |> list.index_map(fn(jump, i) { #(i, jump) })
    |> list.fold(#(0, 0, 0), fn(state, cell) {
      let #(jumps, window_end, furthest) = state
      let #(i, jump) = cell
      case i >= n - 1 {
        True -> state
        False -> {
          let furthest = int.max(furthest, i + jump)
          case i == window_end {
            True -> #(jumps + 1, furthest, furthest)
            False -> #(jumps, window_end, furthest)
          }
        }
      }
    })
  jumps
}
