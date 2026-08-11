/// O(n) rather than O(log n), but it makes the shape of the problem obvious:
/// a rotated sorted array has exactly one place where a value drops, and that
/// drop is the minimum. No drop means it was never rotated, so the head wins.
pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(scan(rest, first, first))
  }
}

fn scan(nums: List(Int), previous: Int, head: Int) -> Int {
  case nums {
    [] -> head
    [n, ..rest] ->
      case n < previous {
        True -> n
        False -> scan(rest, n, head)
      }
  }
}
