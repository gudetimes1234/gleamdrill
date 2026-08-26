import gleam/list

pub fn find_duplicate(nums: List(Int)) -> Int {
  // Binary search over the *values*, not the positions. For a candidate v,
  // count how many numbers are at most v: with no duplicate that count is
  // exactly v, so a count that runs ahead says the repeat is at or below v.
  // O(n log n) against Floyd's O(n), but it needs no insight about cycles —
  // only that the pigeonhole is what makes the count informative.
  search(nums, 1, list.length(nums) - 1)
}

fn search(nums: List(Int), low: Int, high: Int) -> Int {
  case low >= high {
    True -> low
    False -> {
      let middle = { low + high } / 2
      let seen = list.count(nums, fn(value) { value <= middle })
      case seen > middle {
        True -> search(nums, low, middle)
        False -> search(nums, middle + 1, high)
      }
    }
  }
}
