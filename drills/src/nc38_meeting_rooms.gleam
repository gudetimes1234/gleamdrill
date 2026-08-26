import gleam/int
import gleam/list

pub fn can_attend_meetings(intervals: List(#(Int, Int))) -> Bool {
  // Sorted by start, the only meeting a given one can clash with is the one
  // immediately before it \u{2014} anything earlier started earlier still and would
  // have clashed with that one first.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.window_by_2
  |> list.all(fn(pair) { pair.0.1 <= pair.1.0 })
}
