import gleam/int
import gleam/list

pub fn insert(
  intervals: List(#(Int, Int)),
  new_interval: #(Int, Int),
) -> List(#(Int, Int)) {
  // Drop the new interval on the end and run the general merge. Throws away the
  // fact that the input was sorted \u{2014} O(n log n) rather than O(n) \u{2014} but it
  // reuses a solution you already have rather than inventing a three-way split.
  [new_interval, ..intervals]
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
