import gleam/list

/// The O(n) baseline the binary search beats: scan with an index. Worth
/// contrasting with the halving version to see what the sortedness buys.
pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, i) {
    case found, n == target {
      Error(Nil), True -> Ok(i)
      _, _ -> found
    }
  })
}
