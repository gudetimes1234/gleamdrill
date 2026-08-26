import gleam/int
import gleam/list

pub fn merge(intervals: List(#(Int, Int))) -> List(#(Int, Int)) {
  // Sorted by start, an interval can only ever overlap the one being built, so
  // a single fold is enough: extend it, or begin a new one.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.fold([], fn(acc, interval) {
    case acc {
      [#(start, end), ..rest] if interval.0 <= end -> [
        #(start, int.max(end, interval.1)),
        ..rest
      ]
      _ -> [interval, ..acc]
    }
  })
  |> list.reverse
}
