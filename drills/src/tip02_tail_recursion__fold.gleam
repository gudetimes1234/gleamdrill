import gleam/list

/// A fold *is* a tail-recursive loop with a name: the accumulator is the second
/// argument, the step function is the body. Once you see that, most hand-written
/// `*_loop` helpers turn into one line.
pub fn reverse(items: List(a)) -> List(a) {
  list.fold(items, [], fn(acc, item) { [item, ..acc] })
}

pub fn sum(numbers: List(Int)) -> Int {
  list.fold(numbers, 0, fn(acc, n) { acc + n })
}
