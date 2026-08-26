import gleam/int

pub fn hamming_weight(n: Int) -> Int {
  count(n, 0)
}

/// One step per bit position rather than per set bit: 32 iterations whatever
/// the input, but nothing to remember beyond "look at the bottom bit, shift".
fn count(n: Int, total: Int) -> Int {
  case n <= 0 {
    True -> total
    False -> count(int.bitwise_shift_right(n, 1), total + int.bitwise_and(n, 1))
  }
}
