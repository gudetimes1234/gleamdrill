pub fn reverse_list(values: List(Int)) -> List(Int) {
  walk(values, [])
}

// The accumulator *is* the reversed list being built, and prepending to it is
// exactly the pointer rewiring the imperative version does one node at a time.
// Nothing is ever traversed twice, so it is one pass and no extra memory beyond
// the result.
fn walk(remaining: List(Int), reversed: List(Int)) -> List(Int) {
  case remaining {
    [] -> reversed
    [head, ..tail] -> walk(tail, [head, ..reversed])
  }
}
