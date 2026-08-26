import gleam/list
import gleam/result

pub fn rotate(matrix: List(List(Int))) -> List(List(Int)) {
  let n = list.length(matrix)
  // Straight from where each element lands: after a clockwise quarter turn the
  // entry at (row, column) came from (n - 1 - column, row). Writing the mapping
  // out once is the surest way not to get the direction backwards.
  positions(n)
  |> list.map(fn(row) {
    positions(n)
    |> list.map(fn(column) { at(matrix, n - 1 - column, row) })
  })
}

fn positions(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

fn at(matrix: List(List(Int)), row: Int, column: Int) -> Int {
  matrix
  |> list.drop(row)
  |> list.first
  |> result.unwrap([])
  |> list.drop(column)
  |> list.first
  |> result.unwrap(0)
}
