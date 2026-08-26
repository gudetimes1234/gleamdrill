import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/order
import gleam/set.{type Set}

pub fn pacific_atlantic(heights: List(List(Int))) -> List(#(Int, Int)) {
  let grid =
    heights
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> dict.from_list

  let rows = list.length(heights)
  let columns = case heights {
    [first, ..] -> list.length(first)
    [] -> 0
  }

  // The direct reading: from each square, flow downhill and see which edges are
  // reachable. Correct, and it repeats nearly all of its work \u{2014} every square
  // on a shared downhill path re-explores the same route. Reversing the
  // question is what removes the repetition.
  dict.keys(grid)
  |> list.filter(fn(at) {
    let reached = downhill(grid, [at], set.new())
    touches(reached, fn(cell: #(Int, Int)) { cell.0 == 0 || cell.1 == 0 })
    && touches(reached, fn(cell: #(Int, Int)) {
      cell.0 == rows - 1 || cell.1 == columns - 1
    })
  })
  |> list.sort(fn(a: #(Int, Int), b: #(Int, Int)) {
    case int.compare(a.0, b.0) {
      order.Eq -> int.compare(a.1, b.1)
      other -> other
    }
  })
}

fn downhill(
  grid: Dict(#(Int, Int), Int),
  frontier: List(#(Int, Int)),
  reached: Set(#(Int, Int)),
) -> Set(#(Int, Int)) {
  case frontier {
    [] -> reached
    [at, ..rest] ->
      case dict.get(grid, at) {
        Error(Nil) -> downhill(grid, rest, reached)
        Ok(height) ->
          case set.contains(reached, at) {
            True -> downhill(grid, rest, reached)
            False -> {
              let lower =
                list.filter(neighbours(at), fn(next) {
                  case dict.get(grid, next) {
                    Ok(value) -> value <= height
                    Error(Nil) -> False
                  }
                })
              downhill(grid, list.append(rest, lower), set.insert(reached, at))
            }
          }
      }
  }
}

fn touches(reached: Set(#(Int, Int)), edge: fn(#(Int, Int)) -> Bool) -> Bool {
  list.any(set.to_list(reached), edge)
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
