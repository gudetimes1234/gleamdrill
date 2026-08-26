import gleam/list

pub fn reverse(items: List(a)) -> List(a) {
  list.fold(items, [], fn(acc, item) { [item, ..acc] })
}

pub fn sum(numbers: List(Int)) -> Int {
  list.fold(numbers, 0, fn(acc, n) { acc + n })
}
