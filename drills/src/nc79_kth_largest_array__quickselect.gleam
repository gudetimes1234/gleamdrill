import gleam/list

pub fn find_kth_largest(nums: List(Int), k: Int) -> Result(Int, Nil) {
  case k < 1 || k > list.length(nums) {
    True -> Error(Nil)
    False -> Ok(select(nums, k))
  }
}

/// Quickselect: partition around a pivot, then recurse into the side that must
/// contain the answer rather than sorting both. Expected O(n), because the work
/// halves each time instead of being repeated \u{2014} the same saving binary search
/// makes over a scan.
fn select(nums: List(Int), k: Int) -> Int {
  case nums {
    [] -> 0
    [pivot, ..rest] -> {
      let bigger = list.filter(rest, fn(n) { n > pivot })
      let equal = list.filter(rest, fn(n) { n == pivot })
      let smaller = list.filter(rest, fn(n) { n < pivot })
      let above = list.length(bigger)

      case k <= above, k <= above + 1 + list.length(equal) {
        True, _ -> select(bigger, k)
        False, True -> pivot
        False, False -> select(smaller, k - above - 1 - list.length(equal))
      }
    }
  }
}
