import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/order
import gleam/result
import gleam/set.{type Set}

pub fn pacific_atlantic(heights: List(List(Int))) -> List(#(Int, Int)) {
  let grid =
    heights
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> dict.from_list

  case dict.size(grid) {
    0 -> []
    _ -> {
      let rows = list.length(heights)
      let columns = case heights {
        [first, ..] -> list.length(first)
        [] -> 0
      }

      // Search *from* each ocean rather than from each cell. Asking "can this
      // square reach the sea?" means a fresh downhill search per square; asking
      // "which squares can the sea reach?" is two uphill searches in total, and
      // the answer is where they overlap.
      let pacific =
        list.append(
          list.map(indices(columns), fn(c) { #(0, c) }),
          list.map(indices(rows), fn(r) { #(r, 0) }),
        )
      let atlantic =
        list.append(
          list.map(indices(columns), fn(c) { #(rows - 1, c) }),
          list.map(indices(rows), fn(r) { #(r, columns - 1) }),
        )

      set.intersection(
        uphill(grid, pacific, set.new()),
        uphill(grid, atlantic, set.new()),
      )
      |> set.to_list
      |> list.sort(fn(a: #(Int, Int), b: #(Int, Int)) {
        case int.compare(a.0, b.0) {
          order.Eq -> int.compare(a.1, b.1)
          other -> other
        }
      })
    }
  }
}

fn uphill(
  grid: Dict(#(Int, Int), Int),
  frontier: List(#(Int, Int)),
  reached: Set(#(Int, Int)),
) -> Set(#(Int, Int)) {
  case frontier {
    [] -> reached
    [at, ..rest] ->
      case dict.get(grid, at) {
        Error(Nil) -> uphill(grid, rest, reached)
        Ok(height) ->
          case set.contains(reached, at) {
            True -> uphill(grid, rest, reached)
            False -> {
              let climbable =
                list.filter(neighbours(at), fn(next) {
                  result.unwrap(dict.get(grid, next), -1) >= height
                })
              uphill(
                grid,
                list.append(rest, climbable),
                set.insert(reached, at),
              )
            }
          }
      }
  }
}

fn indices(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
