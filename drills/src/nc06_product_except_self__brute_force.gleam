import gleam/list

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
