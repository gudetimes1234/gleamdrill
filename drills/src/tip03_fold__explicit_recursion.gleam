import gleam/int
import gleam/list

/// What each fold expands to. Useful to write once so the folded version stops
/// looking like magic — and to notice that `count_if` here is not tail
/// recursive, while the fold always is.
pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(max_loop(rest, first))
  }
}

fn max_loop(numbers: List(Int), best: Int) -> Int {
  case numbers {
    [] -> best
    [n, ..rest] -> max_loop(rest, int.max(best, n))
  }
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  case items {
    [] -> 0
    [first, ..rest] ->
      case predicate(first) {
        True -> 1 + count_if(rest, predicate)
        False -> count_if(rest, predicate)
      }
  }
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  running_loop(numbers, 0, [])
}

fn running_loop(numbers: List(Int), total: Int, acc: List(Int)) -> List(Int) {
  case numbers {
    [] -> list.reverse(acc)
    [n, ..rest] -> running_loop(rest, total + n, [total + n, ..acc])
  }
}
