import gleam/list

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  outer(nums, target, 0)
}

fn outer(nums: List(Int), target: Int, i: Int) -> Result(#(Int, Int), Nil) {
  case nums {
    [] -> Error(Nil)
    [n, ..rest] ->
      case inner(rest, target - n, i + 1) {
        Ok(j) -> Ok(#(i, j))
        Error(Nil) -> outer(rest, target, i + 1)
      }
  }
}

fn inner(nums: List(Int), needed: Int, j: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, offset) {
    case found, n == needed {
      Error(Nil), True -> Ok(j + offset)
      _, _ -> found
    }
  })
}
