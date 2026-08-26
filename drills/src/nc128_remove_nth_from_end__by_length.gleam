import gleam/list

pub fn remove_nth_from_end(values: List(Int), n: Int) -> List(Int) {
  // Count first, then drop by position. Two passes rather than one, and it says
  // outright what the two-walker version encodes in a gap: nth from the end is
  // length minus n from the front. Where a list cannot be walked twice — a
  // stream, say — that is exactly the assumption that fails.
  let index = list.length(values) - n
  case index < 0 {
    True -> values
    False -> list.append(list.take(values, index), list.drop(values, index + 1))
  }
}
