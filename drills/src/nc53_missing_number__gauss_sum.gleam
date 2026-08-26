import gleam/int
import gleam/list

pub fn missing_number(nums: List(Int)) -> Int {
  // The numbers 0..n sum to n(n+1)/2 whatever order they arrive in, so the gap
  // between that and the actual total is the missing value. One multiplication
  // instead of a pass of XORs \u{2014} but it overflows on inputs the XOR version
  // handles fine, which is the trade worth knowing.
  let n = list.length(nums)
  n * { n + 1 } / 2 - int.sum(nums)
}
