import gleam/int
import gleam/list

pub fn insert(
  intervals: List(#(Int, Int)),
  new_interval: #(Int, Int),
) -> List(#(Int, Int)) {
  // The input is already sorted, so the list falls into three runs: everything
  // that finishes before the new one starts, everything that touches it, and
  // everything that starts after it ends.
  let #(before, rest) =
    list.split_while(intervals, fn(i) { i.1 < new_interval.0 })
  let #(overlapping, after) =
    list.split_while(rest, fn(i) { i.0 <= new_interval.1 })

  let merged =
    list.fold(overlapping, new_interval, fn(acc, i) {
      #(int.min(acc.0, i.0), int.max(acc.1, i.1))
    })

  list.flatten([before, [merged], after])
}
