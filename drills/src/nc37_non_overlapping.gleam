import gleam/int
import gleam/list

pub fn erase_overlap_intervals(intervals: List(#(Int, Int))) -> Int {
  // Greedy on the end: among any set of intervals competing for the same space,
  // keeping the one that finishes earliest leaves the most room for whatever
  // comes next, and can never be worse.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.1, b.1) })
  |> list.fold(#(0, -2_147_483_648), fn(state, interval) {
    let #(removed, last_end) = state
    case interval.0 >= last_end {
      True -> #(removed, interval.1)
      False -> #(removed + 1, last_end)
    }
  })
  |> fn(state) { state.0 }
}
