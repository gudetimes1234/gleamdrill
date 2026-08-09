import gleam/set

pub fn contains_duplicate(nums: List(Int)) -> Bool {
  check(nums, set.new())
}

fn check(nums: List(Int), seen: set.Set(Int)) -> Bool {
  case nums {
    [] -> False
    [n, ..rest] ->
      case set.contains(seen, n) {
        True -> True
        False -> check(rest, set.insert(seen, n))
      }
  }
}
