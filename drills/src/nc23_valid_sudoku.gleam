import gleam/int
import gleam/list
import gleam/set

pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  board
  |> filled_cells
  |> walk(set.new())
}

fn filled_cells(board: List(List(String))) -> List(#(Int, Int, String)) {
  board
  |> list.index_map(fn(row, r) {
    row
    |> list.index_map(fn(value, c) { #(r, c, value) })
    |> list.filter(fn(cell) { cell.2 != "." })
  })
  |> list.flatten
}

fn walk(cells: List(#(Int, Int, String)), seen: set.Set(String)) -> Bool {
  case cells {
    [] -> True
    [#(r, c, value), ..rest] -> {
      let keys = [
        value <> " row " <> int.to_string(r),
        value <> " col " <> int.to_string(c),
        value <> " box " <> int.to_string(r / 3 * 3 + c / 3),
      ]
      case list.any(keys, set.contains(seen, _)) {
        True -> False
        False -> walk(rest, list.fold(keys, seen, set.insert))
      }
    }
  }
}
