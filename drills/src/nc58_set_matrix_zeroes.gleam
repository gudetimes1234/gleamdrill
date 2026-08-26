import gleam/list
import gleam/set

pub fn set_zeroes(matrix: List(List(Int))) -> List(List(Int)) {
  // Two passes, and they cannot be one: writing a zero as you find it would be
  // indistinguishable from a zero that was already there, and the whole grid
  // would clear. So record which rows and columns are doomed first, then apply.
  let doomed =
    matrix
    |> list.index_map(fn(row, r) {
      row
      |> list.index_map(fn(value, c) { #(r, c, value) })
      |> list.filter(fn(cell) { cell.2 == 0 })
    })
    |> list.flatten

  let rows = set.from_list(list.map(doomed, fn(cell) { cell.0 }))
  let columns = set.from_list(list.map(doomed, fn(cell) { cell.1 }))

  matrix
  |> list.index_map(fn(row, r) {
    row
    |> list.index_map(fn(value, c) {
      case set.contains(rows, r) || set.contains(columns, c) {
        True -> 0
        False -> value
      }
    })
  })
}
