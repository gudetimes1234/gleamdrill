import gleam/list
import gleam/result

pub fn set_zeroes(matrix: List(List(Int))) -> List(List(Int)) {
  let columns = case matrix {
    [] -> []
    _ -> list.transpose(matrix)
  }

  // The condition stated outright: a cell is cleared exactly when its own row
  // holds a zero or its own column does. Nothing is recorded and nothing is
  // ordered, so the two-pass trap cannot arise \u{2014} at the cost of rescanning a
  // row and a column for every single cell.
  list.index_map(matrix, fn(row, _r) {
    list.index_map(row, fn(value, c) {
      case list.contains(row, 0) || list.contains(column(columns, c), 0) {
        True -> 0
        False -> value
      }
    })
  })
}

fn column(columns: List(List(Int)), index: Int) -> List(Int) {
  columns |> list.drop(index) |> list.first |> result.unwrap([])
}
