pub fn merge_two_lists(first: List(Int), second: List(Int)) -> List(Int) {
  // Take the smaller head and recurse on the rest. Because both inputs are
  // already sorted, whichever head is smaller is smaller than everything still
  // to come — no comparison beyond the two fronts is ever needed.
  case first, second {
    [], rest -> rest
    rest, [] -> rest
    [a, ..a_rest], [b, ..b_rest] ->
      case a <= b {
        True -> [a, ..merge_two_lists(a_rest, second)]
        False -> [b, ..merge_two_lists(first, b_rest)]
      }
  }
}
