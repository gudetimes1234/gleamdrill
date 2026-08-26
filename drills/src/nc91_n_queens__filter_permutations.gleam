import gleam/list
import gleam/string

pub fn solve_n_queens(n: Int) -> List(List(String)) {
  // One queen per row with no two sharing a column *is* a permutation of the
  // columns, so the row and column rules are satisfied by construction and only
  // the diagonals are left to test. Generating all n! and filtering is far
  // slower than pruning as you go \u{2014} it explores arrangements a backtracker
  // would have abandoned at the second queen \u{2014} but it names what the search
  // space actually is.
  permutations(columns(n))
  |> list.filter(no_diagonal_clash)
  |> list.map(fn(chosen) { render(chosen, n) })
}

fn columns(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

fn permutations(values: List(Int)) -> List(List(Int)) {
  case values {
    [] -> [[]]
    _ ->
      list.index_map(values, fn(value, i) { #(i, value) })
      |> list.flat_map(fn(chosen: #(Int, Int)) {
        let rest =
          list.index_map(values, fn(value, i) { #(i, value) })
          |> list.filter(fn(other: #(Int, Int)) { other.0 != chosen.0 })
          |> list.map(fn(other: #(Int, Int)) { other.1 })
        list.map(permutations(rest), fn(tail) { [chosen.1, ..tail] })
      })
  }
}

fn no_diagonal_clash(chosen: List(Int)) -> Bool {
  let placed = list.index_map(chosen, fn(column, row) { #(row, column) })

  list.all(placed, fn(a: #(Int, Int)) {
    list.all(placed, fn(b: #(Int, Int)) {
      a.0 == b.0 || absolute(a.0 - b.0) != absolute(a.1 - b.1)
    })
  })
}

fn absolute(n: Int) -> Int {
  case n < 0 {
    True -> -n
    False -> n
  }
}

fn render(chosen: List(Int), n: Int) -> List(String) {
  list.map(chosen, fn(column) {
    string.repeat(".", column) <> "Q" <> string.repeat(".", n - column - 1)
  })
}
