import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub fn swim_in_water(grid: List(List(Int))) -> Int {
  let heights = cells(grid)
  let n = list.length(grid)
  case n {
    0 -> 0
    _ ->
      cross(
        heights,
        #(n - 1, n - 1),
        [#(#(0, 0), result.unwrap(dict.get(heights, #(0, 0)), 0))],
        set.new(),
      )
  }
}

// Dijkstra's, with "cost of a path" redefined from the sum of its steps to the
// largest step in it — the water only has to rise once. Everything else about
// the algorithm is unchanged, which is the point: settle the cheapest reachable
// cell, and the first time the far corner is settled that cost is the answer.
fn cross(
  heights: Dict(#(Int, Int), Int),
  target: #(Int, Int),
  frontier: List(#(#(Int, Int), Int)),
  seen: Set(#(Int, Int)),
) -> Int {
  case frontier {
    [] -> -1
    [head, ..tail] -> {
      let #(at, cost) =
        list.fold(
          tail,
          head,
          fn(best: #(#(Int, Int), Int), entry: #(#(Int, Int), Int)) {
            case entry.1 < best.1 {
              True -> entry
              False -> best
            }
          },
        )
      let rest =
        list.filter(frontier, fn(entry: #(#(Int, Int), Int)) { entry.0 != at })
      case at == target, set.contains(seen, at) {
        True, _ -> cost
        _, True -> cross(heights, target, rest, seen)
        _, False -> {
          let seen = set.insert(seen, at)
          let reached =
            neighbours(at)
            |> list.filter_map(fn(next) {
              case set.contains(seen, next), dict.get(heights, next) {
                False, Ok(height) -> Ok(#(next, max(cost, height)))
                _, _ -> Error(Nil)
              }
            })
          cross(heights, target, list.append(rest, reached), seen)
        }
      }
    }
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  [
    #(at.0 - 1, at.1),
    #(at.0 + 1, at.1),
    #(at.0, at.1 - 1),
    #(at.0, at.1 + 1),
  ]
}

fn cells(grid: List(List(Int))) -> Dict(#(Int, Int), Int) {
  grid
  |> list.index_map(fn(row, r) {
    list.index_map(row, fn(height, c) { #(#(r, c), height) })
  })
  |> list.flatten
  |> dict.from_list
}

fn max(a: Int, b: Int) -> Int {
  case a > b {
    True -> a
    False -> b
  }
}
