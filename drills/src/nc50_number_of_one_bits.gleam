import gleam/int

pub fn hamming_weight(n: Int) -> Int {
  // n & (n - 1) clears the lowest set bit and nothing else, so the loop runs
  // once per one bit rather than once per bit position.
  case n {
    0 -> 0
    _ -> 1 + hamming_weight(int.bitwise_and(n, n - 1))
  }
}
