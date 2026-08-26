import gleam/int
import gleam/list
import gleam/set.{type Set}

pub fn max_area_of_island(grid: List(List(Int))) -> Int {
  let land =
    grid
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> list.filter(fn(cell: #(#(Int, Int), Int)) { cell.1 == 1 })
    |> list.map(fn(cell: #(#(Int, Int), Int)) { cell.0 })
    |> set.from_list

  // The same component search as counting islands, except each search reports
  // how much it covered rather than just that it happened. Growing the seen set
  // and measuring how much it grew is the tidiest way to say that without
  // threading a counter through the recursion.
  let #(best, _) =
    list.fold(set.to_list(land), #(0, set.new()), fn(state, at) {
      let #(best, seen) = state
      case set.contains(seen, at) {
        True -> #(best, seen)
        False -> {
          let grown = flood(land, at, seen)
          #(int.max(best, set.size(grown) - set.size(seen)), grown)
        }
      }
    })
  best
}

fn flood(
  land: Set(#(Int, Int)),
  at: #(Int, Int),
  seen: Set(#(Int, Int)),
) -> Set(#(Int, Int)) {
  case set.contains(land, at) && !set.contains(seen, at) {
    False -> seen
    True ->
      list.fold(neighbours(at), set.insert(seen, at), fn(seen, next) {
        flood(land, next, seen)
      })
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
