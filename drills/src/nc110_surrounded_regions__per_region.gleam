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

  // The direct reading: find each region, then decide whether it escapes. It
  // works, and it needs a second idea the border search does not \u{2014} the whole
  // region has to be collected before any verdict can be given, so the search
  // cannot stop early and the escape test is over the component rather than a
  // single square.
  let #(doomed, _) =
    list.fold(set.to_list(open), #(set.new(), set.new()), fn(state, at) {
      let #(doomed, seen) = state
      case set.contains(seen, at) {
        True -> #(doomed, seen)
        False -> {
          let region = flood(open, at, set.new())
          let escapes =
            list.any(set.to_list(region), fn(cell: #(Int, Int)) {
              cell.0 == 0
              || cell.1 == 0
              || cell.0 == rows - 1
              || cell.1 == columns - 1
            })
          #(
            case escapes {
              True -> doomed
              False -> set.union(doomed, region)
            },
            set.union(seen, region),
          )
        }
      }
    })

  board
  |> list.index_map(fn(row, r) {
    list.index_map(row, fn(value, c) {
      case set.contains(doomed, #(r, c)) {
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
