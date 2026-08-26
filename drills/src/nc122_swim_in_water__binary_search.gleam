import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub fn swim_in_water(grid: List(List(Int))) -> Int {
  let heights = cells(grid)
  let n = list.length(grid)
  case n {
    0 -> 0
    _ -> {
      // Reachability at time t is monotone: once the corner can be reached it
      // stays reachable as the water rises further. That is exactly the shape
      // binary search needs, so the question turns from "what is the cheapest
      // path" into "is it possible yet", answered by a plain flood fill.
      let start = result.unwrap(dict.get(heights, #(0, 0)), 0)
      search(heights, #(n - 1, n - 1), start, n * n - 1)
    }
  }
}

fn search(
  heights: Dict(#(Int, Int), Int),
  target: #(Int, Int),
  low: Int,
  high: Int,
) -> Int {
  case low >= high {
    True -> low
    False -> {
      let middle = { low + high } / 2
      case reaches(heights, target, [#(0, 0)], set.new(), middle) {
        True -> search(heights, target, low, middle)
        False -> search(heights, target, middle + 1, high)
      }
    }
  }
}

fn reaches(
  heights: Dict(#(Int, Int), Int),
  target: #(Int, Int),
  frontier: List(#(Int, Int)),
  seen: Set(#(Int, Int)),
  limit: Int,
) -> Bool {
  case frontier {
    [] -> False
    [at, ..rest] ->
      // The target has to be passable itself — testing for it before testing
      // its depth would report the corner reached while it is still too deep.
      case set.contains(seen, at), dict.get(heights, at) {
        False, Ok(height) if height <= limit ->
          case at == target {
            True -> True
            False ->
              reaches(
                heights,
                target,
                list.append(rest, neighbours(at)),
                set.insert(seen, at),
                limit,
              )
          }
        _, _ -> reaches(heights, target, rest, seen, limit)
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
