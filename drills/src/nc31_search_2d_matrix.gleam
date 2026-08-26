import gleam/int
import gleam/list
import gleam/order

pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  case find_row(matrix, target) {
    Ok(row) -> contains(row, target)
    Error(Nil) -> False
  }
}

/// The rows are sorted and do not overlap, so the row a value could live in is
/// itself found by halving: compare the target against a row's ends.
fn find_row(rows: List(List(Int)), target: Int) -> Result(List(Int), Nil) {
  case rows {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(rows) / 2
      let #(before, rest) = list.split(rows, half)
      case rest {
        [] -> Error(Nil)
        [row, ..after] ->
          case list.last(row), list.first(row) {
            Ok(last), _ if last < target -> find_row(after, target)
            _, Ok(first) if first > target -> find_row(before, target)
            Ok(_), Ok(_) -> Ok(row)
            _, _ -> Error(Nil)
          }
      }
    }
  }
}

fn contains(row: List(Int), target: Int) -> Bool {
  case row {
    [] -> False
    _ -> {
      let half = list.length(row) / 2
      let #(before, rest) = list.split(row, half)
      case rest {
        [] -> False
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> True
            order.Lt -> contains(before, target)
            order.Gt -> contains(after, target)
          }
      }
    }
  }
}
