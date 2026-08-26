import gleam/dict.{type Dict}
import gleam/list

const infinity = 2_147_483_647

pub fn walls_and_gates(rooms: List(List(Int))) -> List(List(Int)) {
  let board =
    rooms
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> dict.from_list

  // One search per empty room, looking for the nearest gate. The answer is the
  // same and the cost is not: every room re-explores the same corridors. It is
  // worth writing once to see why starting from the gates instead \u{2014} the
  // sources, not the questions \u{2014} collapses all of it into a single pass.
  rooms
  |> list.index_map(fn(row, r) {
    list.index_map(row, fn(value, c) {
      case value == infinity {
        False -> value
        True ->
          nearest_gate(board, [#(r, c)], dict.from_list([#(#(r, c), 0)]), 0)
      }
    })
  })
}

fn nearest_gate(
  board: Dict(#(Int, Int), Int),
  frontier: List(#(Int, Int)),
  seen: Dict(#(Int, Int), Int),
  steps: Int,
) -> Int {
  case list.any(frontier, fn(at) { dict.get(board, at) == Ok(0) }) {
    True -> steps
    False -> {
      let next =
        frontier
        |> list.flat_map(neighbours)
        |> list.filter(fn(at) {
          !dict.has_key(seen, at)
          && case dict.get(board, at) {
            Ok(value) -> value != -1
            Error(Nil) -> False
          }
        })
        |> list.unique

      case next {
        [] -> infinity
        _ ->
          nearest_gate(
            board,
            next,
            list.fold(next, seen, fn(acc, at) { dict.insert(acc, at, steps) }),
            steps + 1,
          )
      }
    }
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
