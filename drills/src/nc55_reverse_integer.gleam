const largest = 2_147_483_647

const smallest = -2_147_483_648

pub fn reverse(x: Int) -> Int {
  build(x, 0)
}

/// Peel a digit off the bottom of the input and push it onto the bottom of the
/// result. The overflow test has to happen *before* the multiply, because in a
/// fixed-width language the multiply is where the value would be lost.
fn build(remaining: Int, result: Int) -> Int {
  case remaining {
    0 -> result
    _ -> {
      let digit = remaining % 10
      case result > largest / 10 || result < smallest / 10 {
        True -> 0
        False -> build(remaining / 10, result * 10 + digit)
      }
    }
  }
}
