import gleam/list
import gleam/result
import gleam/string

pub fn num_distinct(s: String, t: String) -> Int {
  let target = string.to_graphemes(t)

  // Row j counts the ways to build the first j characters of t out of the
  // source seen so far. A new source character can extend a count at j-1 into
  // one at j, but only if it matches t[j-1].
  //
  // In an array version this row has to be swept right to left, or an update at
  // j-1 feeds straight into j and the same source character gets used twice.
  // Building a fresh row from the old one removes the hazard entirely, which is
  // worth noticing: the direction was never part of the recurrence.
  s
  |> string.to_graphemes
  |> list.fold([1, ..list.repeat(0, list.length(target))], fn(row, from_s) {
    extend(row, target, from_s)
  })
  |> list.last
  |> result.unwrap(0)
}

fn extend(row: List(Int), target: List(String), from_s: String) -> List(Int) {
  [
    1,
    ..list.index_map(target, fn(from_t, j) {
      case from_s == from_t {
        True -> nth(row, j + 1) + nth(row, j)
        False -> nth(row, j + 1)
      }
    })
  ]
}

fn nth(values: List(Int), index: Int) -> Int {
  values |> list.drop(index) |> list.first |> result.unwrap(0)
}
