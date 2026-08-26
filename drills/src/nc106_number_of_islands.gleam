import gleam/list
import gleam/set.{type Set}

pub fn num_islands(grid: List(List(String))) -> Int {
  let cells = coordinates(grid)
  let land =
    cells
    |> list.filter(fn(cell: #(#(Int, Int), String)) { cell.1 == "1" })
    |> list.map(fn(cell: #(#(Int, Int), String)) { cell.0 })
    |> set.from_list

  // Counting connected components: start a search at every piece of land not
  // already reached, and each search that has to be started is one more island.
  // Marking as you go is what stops a component being counted once per square.
  let #(count, _) =
    list.fold(set.to_list(land), #(0, set.new()), fn(state, at) {
      let #(count, seen) = state
      case set.contains(seen, at) {
        True -> #(count, seen)
        False -> #(count + 1, flood(land, at, seen))
      }
    })
  count
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

fn coordinates(grid: List(List(String))) -> List(#(#(Int, Int), String)) {
  grid
  |> list.index_map(fn(row, r) {
    list.index_map(row, fn(value, c) { #(#(r, c), value) })
  })
  |> list.flatten
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
