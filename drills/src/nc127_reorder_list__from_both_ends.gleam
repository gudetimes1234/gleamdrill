import gleam/list

pub fn reorder_list(values: List(Int)) -> List(Int) {
  // Take from the front, then from the back, until they meet. Reads exactly
  // like the specification and needs no midpoint and no reversal — but each
  // "take from the back" is a full walk of what is left, so it is O(n²) where
  // the split-and-reverse version is O(n).
  take_ends(values, [])
}

fn take_ends(remaining: List(Int), out: List(Int)) -> List(Int) {
  case remaining {
    [] -> list.reverse(out)
    [only] -> list.reverse([only, ..out])
    [first, ..rest] -> {
      let assert Ok(last) = list.last(rest)
      let middle = list.take(rest, list.length(rest) - 1)
      take_ends(middle, [last, first, ..out])
    }
  }
}
