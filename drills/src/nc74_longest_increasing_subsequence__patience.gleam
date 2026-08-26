import gleam/list

pub fn length_of_lis(nums: List(Int)) -> Int {
  // Patience sorting. Keep the smallest value that any subsequence of each
  // length ends with; that list is always sorted, so each number either extends
  // it or replaces the first entry it is no bigger than. The list is not the
  // answer subsequence \u{2014} only its length is meaningful.
  list.length(list.fold(nums, [], fn(tails, n) { place(tails, n, []) }))
}

/// Finds the first tail this number can replace. Textbook this is a binary
/// search; on a linked list there is nothing to halve, so it is a walk \u{2014} the
/// bookkeeping is the point here, not the constant factor.
fn place(tails: List(Int), n: Int, seen: List(Int)) -> List(Int) {
  case tails {
    [] -> list.reverse([n, ..seen])
    [first, ..rest] ->
      case first >= n {
        True -> list.append(list.reverse([n, ..seen]), rest)
        False -> place(rest, n, [first, ..seen])
      }
  }
}
