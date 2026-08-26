import gleam/dict.{type Dict}
import gleam/list
import gleam/set.{type Set}

pub fn oranges_rotting(grid: List(List(Int))) -> Int {
  let cells =
    grid
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
  let board = dict.from_list(cells)

  let rotten =
    cells
    |> list.filter(fn(cell: #(#(Int, Int), Int)) { cell.1 == 2 })
    |> list.map(fn(cell: #(#(Int, Int), Int)) { cell.0 })
  let fresh =
    cells
    |> list.filter(fn(cell: #(#(Int, Int), Int)) { cell.1 == 1 })
    |> list.map(fn(cell: #(#(Int, Int), Int)) { cell.0 })
    |> set.from_list

  // Breadth-first from *every* rotten orange at once, which is what makes the
  // level count a time: all the sources start at minute zero together, so each
  // wave of the search is one minute. A separate search per source would give
  // distances from each, and then need combining.
  let #(minutes, reached) = spread(board, rotten, set.from_list(rotten), 0)

  case set.size(set.difference(fresh, reached)) {
    // Something fresh was never reached, so it never rots.
    0 -> minutes
    _ -> -1
  }
}

fn spread(
  board: Dict(#(Int, Int), Int),
  frontier: List(#(Int, Int)),
  reached: Set(#(Int, Int)),
  minutes: Int,
) -> #(Int, Set(#(Int, Int))) {
  let next =
    frontier
    |> list.flat_map(neighbours)
    |> list.filter(fn(at) {
      dict.get(board, at) == Ok(1) && !set.contains(reached, at)
    })
    |> list.unique

  case next {
    [] -> #(minutes, reached)
    _ -> spread(board, next, list.fold(next, reached, set.insert), minutes + 1)
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
