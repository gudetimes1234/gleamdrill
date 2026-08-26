import gleam/int
import gleam/list

pub fn erase_overlap_intervals(intervals: List(#(Int, Int))) -> Int {
  // Sorted by start instead: on an overlap you must drop one of the two, and
  // dropping whichever ends later is always at least as good. Same greedy
  // argument, made at the moment of the clash rather than in the sort order.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.fold(#(0, -2_147_483_648), fn(state, interval) {
    let #(removed, last_end) = state
    case interval.0 >= last_end {
      True -> #(removed, interval.1)
      False -> #(removed + 1, int.min(last_end, interval.1))
    }
  })
  |> fn(state) { state.0 }
}
