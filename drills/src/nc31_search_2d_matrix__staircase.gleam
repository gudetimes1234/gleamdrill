import gleam/int
import gleam/list
import gleam/order

pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  let width = case matrix {
    [row, ..] -> list.length(row)
    [] -> 0
  }
  walk(matrix, width, target)
}

/// From the top-right corner every step is forced: too big and the whole column
/// is too big, so drop it; too small and the whole row is too small, so drop
/// that. O(m + n), and it never uses the fact that rows do not overlap \u{2014} it
/// works on any matrix sorted along both axes.
fn walk(rows: List(List(Int)), column: Int, target: Int) -> Bool {
  case rows, column <= 0 {
    [], _ -> False
    _, True -> False
    [row, ..below], False ->
      case row |> list.drop(column - 1) |> list.first {
        Error(Nil) -> False
        Ok(value) ->
          case int.compare(value, target) {
            order.Eq -> True
            order.Gt -> walk(rows, column - 1, target)
            order.Lt -> walk(below, column, target)
          }
      }
  }
}
