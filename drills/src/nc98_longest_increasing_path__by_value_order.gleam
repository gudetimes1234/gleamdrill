import gleam/dict
import gleam/int
import gleam/list
import gleam/result

pub fn longest_increasing_path(matrix: List(List(Int))) -> Int {
  let cells =
    matrix
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
  let grid = dict.from_list(cells)

  // The same acyclicity used the other way round: process the squares from
  // largest value to smallest, and by the time a square is reached every square
  // it can move to has already been settled. A topological order without ever
  // building the graph \u{2014} sorting by value *is* the order.
  let lengths =
    cells
    |> list.sort(fn(a: #(#(Int, Int), Int), b: #(#(Int, Int), Int)) {
      int.compare(b.1, a.1)
    })
    |> list.fold(dict.new(), fn(lengths, cell) {
      let #(at, here) = cell
      let best =
        list.fold(neighbours(at), 1, fn(best, next) {
          case dict.get(grid, next) {
            Ok(value) if value > here ->
              int.max(best, result.unwrap(dict.get(lengths, next), 1) + 1)
            _ -> best
          }
        })
      dict.insert(lengths, at, best)
    })

  list.fold(dict.values(lengths), 0, int.max)
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}
