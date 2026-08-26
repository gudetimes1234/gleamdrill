import gleam/dict.{type Dict}
import gleam/list
import gleam/result

const infinity = 2_147_483_647

pub fn walls_and_gates(rooms: List(List(Int))) -> List(List(Int)) {
  let cells =
    rooms
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
  let board = dict.from_list(cells)

  let gates =
    cells
    |> list.filter(fn(cell: #(#(Int, Int), Int)) { cell.1 == 0 })
    |> list.map(fn(cell: #(#(Int, Int), Int)) { cell.0 })

  // One breadth-first search starting from *all* the gates at once, rather than
  // one search per empty room. Because every source begins at distance zero
  // together, the first time a room is reached is by its nearest gate \u{2014} the
  // multi-source search does the whole grid in one pass.
  let distances =
    spread(
      board,
      gates,
      dict.from_list(list.map(gates, fn(at) { #(at, 0) })),
      1,
    )

  rooms
  |> list.index_map(fn(row, r) {
    list.index_map(row, fn(value, c) {
      case value == infinity {
        True -> result.unwrap(dict.get(distances, #(r, c)), infinity)
        False -> value
      }
    })
  })
}

fn spread(
  board: Dict(#(Int, Int), Int),
  frontier: List(#(Int, Int)),
  distances: Dict(#(Int, Int), Int),
  steps: Int,
) -> Dict(#(Int, Int), Int) {
  let next =
    frontier
    |> list.flat_map(neighbours)
    |> list.filter(fn(at) {
      dict.get(board, at) == Ok(infinity) && !dict.has_key(distances, at)
    })
    |> list.unique

  case next {
    [] -> distances
    _ ->
      spread(
        board,
        next,
        list.fold(next, distances, fn(acc, at) { dict.insert(acc, at, steps) }),
        steps + 1,
      )
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
