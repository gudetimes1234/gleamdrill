import gleam/int
import gleam/list

pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(list.fold(rest, first, int.max))
  }
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  list.fold(items, 0, fn(count, item) {
    case predicate(item) {
      True -> count + 1
      False -> count
    }
  })
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  list.scan(numbers, 0, fn(acc, n) { acc + n })
}
