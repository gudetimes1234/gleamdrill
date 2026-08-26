import gleam/dict.{type Dict}
import gleam/list

pub fn oranges_rotting(grid: List(List(Int))) -> Int {
  let board =
    grid
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> dict.from_list

  tick(board, 0)
}

/// Rewrite the whole grid once per minute rather than tracking a frontier. Much
/// more work \u{2014} every square is examined every minute, not just the ones next
/// to the rot \u{2014} but it is the problem statement executed literally, and it
/// makes plain that the answer counts *rounds*, not distances.
fn tick(board: Dict(#(Int, Int), Int), minutes: Int) -> Int {
  let next =
    dict.map_values(board, fn(at, value) {
      case
        value == 1
        && list.any(neighbours(at), fn(n) { dict.get(board, n) == Ok(2) })
      {
        True -> 2
        False -> value
      }
    })

  case next == board {
    // Nothing changed: either everything has rotted or what is left never will.
    True ->
      case list.any(dict.values(board), fn(value) { value == 1 }) {
        True -> -1
        False -> minutes
      }
    False -> tick(next, minutes + 1)
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
