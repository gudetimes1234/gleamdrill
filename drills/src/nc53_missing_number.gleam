import gleam/int
import gleam/list

pub fn missing_number(nums: List(Int)) -> Int {
  // XOR every value against every index it should have had. Each present number
  // meets its own index and cancels; the missing one has an index with no
  // partner, so that index is what survives.
  let with_indices =
    list.index_fold(nums, 0, fn(acc, n, i) {
      int.bitwise_exclusive_or(int.bitwise_exclusive_or(acc, n), i)
    })
  int.bitwise_exclusive_or(with_indices, list.length(nums))
}
