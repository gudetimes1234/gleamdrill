import gleam/list

/// The obvious O(n²) reading of the problem: for each slot, multiply everything
/// that is not in it. Worth knowing as the thing the prefix/suffix trick beats.
pub fn product_except_self(nums: List(Int)) -> List(Int) {
  list.index_map(nums, fn(_, i) {
    list.index_fold(nums, 1, fn(product, n, j) {
      case i == j {
        True -> product
        False -> product * n
      }
    })
  })
}
