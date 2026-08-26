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

  // Breadth-first instead. For a component's *size* the traversal order does
  // not matter at all \u{2014} either visits every square exactly once \u{2014} so the
  // choice is about the machine: a queue keeps the memory proportional to the
  // frontier rather than to the deepest path, which is what saves a long thin
  // island from overflowing the stack.
  let #(best, _) =
    list.fold(set.to_list(land), #(0, set.new()), fn(state, at) {
      let #(best, seen) = state
      case set.contains(seen, at) {
        True -> #(best, seen)
        False -> {
          let #(area, seen) = spread(land, [at], seen, 0)
          #(int.max(best, area), seen)
        }
      }
    })
  best
}

fn spread(
  land: Set(#(Int, Int)),
  frontier: List(#(Int, Int)),
  seen: Set(#(Int, Int)),
  area: Int,
) -> #(Int, Set(#(Int, Int))) {
  case frontier {
    [] -> #(area, seen)
    [at, ..rest] ->
      case set.contains(land, at) && !set.contains(seen, at) {
        False -> spread(land, rest, seen, area)
        True ->
          spread(
            land,
            list.append(rest, neighbours(at)),
            set.insert(seen, at),
            area + 1,
          )
      }
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
