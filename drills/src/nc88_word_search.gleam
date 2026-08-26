import gleam/dict.{type Dict}
import gleam/list
import gleam/set.{type Set}
import gleam/string

pub fn exist(board: List(List(String)), word: String) -> Bool {
  let cells =
    board
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
  let grid = dict.from_list(cells)
  let letters = string.to_graphemes(word)

  case letters {
    [] -> True
    _ ->
      list.any(cells, fn(cell: #(#(Int, Int), String)) {
        walk(grid, cell.0, letters, set.new())
      })
  }
}

/// Depth-first from every starting square, with the path so far held in a set
/// so a letter is never reused within one attempt. The set is per-path rather
/// than global \u{2014} a square rejected on one route must still be available on
/// another, which is the difference between backtracking and plain search.
fn walk(
  grid: Dict(#(Int, Int), String),
  at: #(Int, Int),
  remaining: List(String),
  used: Set(#(Int, Int)),
) -> Bool {
  case remaining {
    [] -> True
    [letter, ..rest] ->
      case set.contains(used, at), dict.get(grid, at) {
        True, _ -> False
        _, Error(Nil) -> False
        _, Ok(value) ->
          case value == letter {
            False -> False
            True -> {
              let used = set.insert(used, at)
              case rest {
                [] -> True
                _ ->
                  list.any(neighbours(at), fn(next) {
                    walk(grid, next, rest, used)
                  })
              }
            }
          }
      }
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
