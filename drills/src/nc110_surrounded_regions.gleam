import gleam/list
import gleam/set.{type Set}

pub fn solve(board: List(List(String))) -> List(List(String)) {
  let rows = list.length(board)
  let columns = case board {
    [first, ..] -> list.length(first)
    [] -> 0
  }

  let open =
    board
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> list.filter(fn(cell: #(#(Int, Int), String)) { cell.1 == "O" })
    |> list.map(fn(cell: #(#(Int, Int), String)) { cell.0 })
    |> set.from_list

  // Invert the question. "Which regions are surrounded?" needs a search per
  // region and a rule for what counts as escaping; "which regions touch an
  // edge?" is one search from the border, and everything it does not reach is
  // surrounded by definition.
  let border =
    set.to_list(open)
    |> list.filter(fn(at: #(Int, Int)) {
      at.0 == 0 || at.1 == 0 || at.0 == rows - 1 || at.1 == columns - 1
    })

  let safe =
    list.fold(border, set.new(), fn(safe, at) { flood(open, at, safe) })

  board
  |> list.index_map(fn(row, r) {
    list.index_map(row, fn(value, c) {
      case value == "O" && !set.contains(safe, #(r, c)) {
        True -> "X"
        False -> value
      }
    })
  })
}

fn flood(
  open: Set(#(Int, Int)),
  at: #(Int, Int),
  seen: Set(#(Int, Int)),
) -> Set(#(Int, Int)) {
  case set.contains(open, at) && !set.contains(seen, at) {
    False -> seen
    True ->
      list.fold(neighbours(at), set.insert(seen, at), fn(seen, next) {
        flood(open, next, seen)
      })
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
