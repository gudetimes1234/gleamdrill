import gleam/list
import gleam/set.{type Set}
import gleam/string

pub fn solve_n_queens(n: Int) -> List(List(String)) {
  place(n, 0, [], set.new(), set.new(), set.new())
  |> list.map(fn(columns) { render(list.reverse(columns), n) })
}

/// One queen per row, so the only choice is which column. A diagonal is
/// identified by row \u{2212} column and an anti-diagonal by row + column, which
/// turns "is this square attacked?" into three set lookups \u{2014} and lets the
/// search abandon a whole subtree the moment one fails.
fn place(
  n: Int,
  row: Int,
  chosen: List(Int),
  columns: Set(Int),
  diagonals: Set(Int),
  anti_diagonals: Set(Int),
) -> List(List(Int)) {
  case row >= n {
    True -> [chosen]
    False ->
      list.index_map(list.repeat(Nil, n), fn(_, column) { column })
      |> list.flat_map(fn(column) {
        case
          set.contains(columns, column)
          || set.contains(diagonals, row - column)
          || set.contains(anti_diagonals, row + column)
        {
          True -> []
          False ->
            place(
              n,
              row + 1,
              [column, ..chosen],
              set.insert(columns, column),
              set.insert(diagonals, row - column),
              set.insert(anti_diagonals, row + column),
            )
        }
      })
  }
}

fn render(columns: List(Int), n: Int) -> List(String) {
  list.map(columns, fn(column) {
    string.repeat(".", column) <> "Q" <> string.repeat(".", n - column - 1)
  })
}
