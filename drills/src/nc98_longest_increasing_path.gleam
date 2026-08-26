import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result

pub fn longest_increasing_path(matrix: List(List(Int))) -> Int {
  let grid =
    matrix
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> dict.from_list

  // Strictly increasing means the moves can never form a cycle \u{2014} the grid is
  // a directed acyclic graph \u{2014} so the longest path from each square is
  // well-defined and can simply be cached. Without that guarantee memoisation
  // would be unsound, which is the fact the problem is really testing.
  let #(best, _) =
    list.fold(dict.keys(grid), #(0, dict.new()), fn(state, at) {
      let #(best, memo) = state
      let #(length, memo) = from(at, grid, memo)
      #(int.max(best, length), memo)
    })
  best
}

fn from(
  at: #(Int, Int),
  grid: Dict(#(Int, Int), Int),
  memo: Dict(#(Int, Int), Int),
) -> #(Int, Dict(#(Int, Int), Int)) {
  case dict.get(memo, at) {
    Ok(cached) -> #(cached, memo)
    Error(Nil) -> {
      let here = result.unwrap(dict.get(grid, at), 0)
      let #(best, memo) =
        list.fold(neighbours(at), #(1, memo), fn(state, next) {
          let #(best, memo) = state
          case dict.get(grid, next) {
            Ok(value) if value > here -> {
              let #(length, memo) = from(next, grid, memo)
              #(int.max(best, length + 1), memo)
            }
            _ -> #(best, memo)
          }
        })
      #(best, dict.insert(memo, at, best))
    }
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
