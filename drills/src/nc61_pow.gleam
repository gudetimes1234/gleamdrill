pub fn my_pow(x: Float, n: Int) -> Float {
  case n < 0 {
    True -> 1.0 /. power(x, -n)
    False -> power(x, n)
  }
}

/// Halving the exponent halves the work: x^n is (x^(n/2))², with one extra
/// multiplication when n is odd. O(log n) multiplications rather than n.
fn power(x: Float, n: Int) -> Float {
  case n {
    0 -> 1.0
    _ -> {
      let half = power(x, n / 2)
      case n % 2 {
        0 -> half *. half
        _ -> half *. half *. x
      }
    }
  }
}
