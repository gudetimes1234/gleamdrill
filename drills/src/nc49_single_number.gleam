import gleam/int
import gleam/list

pub fn single_number(nums: List(Int)) -> Int {
  // XOR is its own inverse and does not care about order, so every value that
  // appears twice cancels itself out and only the lone one survives.
  list.fold(nums, 0, int.bitwise_exclusive_or)
}
