import gleam/list
import gleam/set

pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  board
  |> units
  |> list.all(no_duplicates)
}

fn units(board: List(List(String))) -> List(List(String)) {
  list.flatten([board, list.transpose(board), boxes(board)])
}

fn boxes(board: List(List(String))) -> List(List(String)) {
  board
  |> list.sized_chunk(3)
  |> list.flat_map(fn(band) {
    band
    |> list.map(list.sized_chunk(_, 3))
    |> list.transpose
    |> list.map(list.flatten)
  })
}

fn no_duplicates(unit: List(String)) -> Bool {
  let filled = list.filter(unit, fn(value) { value != "." })
  list.length(filled) == set.size(set.from_list(filled))
}
