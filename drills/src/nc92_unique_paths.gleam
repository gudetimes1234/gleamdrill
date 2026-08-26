import gleam/list

pub fn unique_paths(m: Int, n: Int) -> Int {
  case m <= 0 || n <= 0 {
    True -> 0
    False ->
      // Only right and down moves, so the ways to reach a square are the ways
      // to reach the one above plus the one to its left. Rows are filled top to
      // bottom, and only the row above is ever needed \u{2014} so one row of counters
      // does for the whole grid.
      list.repeat(Nil, m - 1)
      |> list.fold(list.repeat(1, n), fn(row, _) { running_sums(row) })
      |> list.last
      |> fn(final) {
        case final {
          Ok(count) -> count
          Error(Nil) -> 0
        }
      }
  }
}

/// Each entry gains everything to its left, which is the left-hand neighbour
/// term of the recurrence applied across the row.
fn running_sums(row: List(Int)) -> List(Int) {
  let #(_, out) =
    list.fold(row, #(0, []), fn(state, value) {
      let #(running, out) = state
      let running = running + value
      #(running, [running, ..out])
    })
  list.reverse(out)
}
