import gleam/list

pub fn reverse_k_group(values: List(Int), k: Int) -> List(Int) {
  // Reverse each full run of k and leave a short tail alone. Checking that k
  // nodes are actually there *before* reversing is the whole difficulty — the
  // imperative version has to walk ahead and come back, because once it starts
  // rewiring it cannot tell how far it got.
  case k <= 1 {
    True -> values
    False -> in_groups(values, k)
  }
}

fn in_groups(values: List(Int), k: Int) -> List(Int) {
  let group = list.take(values, k)
  case list.length(group) < k {
    True -> values
    False ->
      list.append(list.reverse(group), in_groups(list.drop(values, k), k))
  }
}
