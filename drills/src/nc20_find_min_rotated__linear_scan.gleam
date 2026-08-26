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
