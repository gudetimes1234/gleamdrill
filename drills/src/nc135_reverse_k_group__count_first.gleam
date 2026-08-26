import gleam/list

pub fn reverse_k_group(values: List(Int), k: Int) -> List(Int) {
  case k <= 1 {
    True -> values
    False -> {
      // Count once, then reverse the first (length / k) × k values and leave
      // the rest. One length calculation instead of a look-ahead per group —
      // and it makes the boundary explicit: everything past the last whole
      // group is untouched, however long it is.
      let whole = list.length(values) / k * k
      list.append(
        reverse_runs(list.take(values, whole), k),
        list.drop(values, whole),
      )
    }
  }
}

fn reverse_runs(values: List(Int), k: Int) -> List(Int) {
  case values {
    [] -> []
    _ ->
      list.append(
        list.reverse(list.take(values, k)),
        reverse_runs(list.drop(values, k), k),
      )
  }
}
