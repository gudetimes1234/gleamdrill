import gleam/list

pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, i) {
    case found, n == target {
      Error(Nil), True -> Ok(i)
      _, _ -> found
    }
  })
}
