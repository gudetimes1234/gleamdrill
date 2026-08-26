pub fn merge_k_lists(lists: List(List(Int))) -> List(Int) {
  // Merge in pairs, halving the number of lists each round. Folding them in one
  // at a time re-walks the growing result every time — O(k·n) — while pairing
  // gives O(n log k) for the same merges, because each element is copied only
  // once per round and there are log k rounds.
  case lists {
    [] -> []
    [only] -> only
    _ -> merge_k_lists(pair_up(lists))
  }
}

fn pair_up(lists: List(List(Int))) -> List(List(Int)) {
  case lists {
    [first, second, ..rest] -> [merge(first, second), ..pair_up(rest)]
    rest -> rest
  }
}

fn merge(first: List(Int), second: List(Int)) -> List(Int) {
  case first, second {
    [], rest -> rest
    rest, [] -> rest
    [a, ..a_rest], [b, ..b_rest] ->
      case a <= b {
        True -> [a, ..merge(a_rest, second)]
        False -> [b, ..merge(first, b_rest)]
      }
  }
}
