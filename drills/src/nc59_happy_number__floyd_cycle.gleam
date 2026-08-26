pub fn is_happy(n: Int) -> Bool {
  // The same question with no memory at all: run one pointer at single speed
  // and another at double, and they meet inside whatever cycle exists. Meeting
  // at 1 means the cycle is the fixed point; meeting anywhere else means it is
  // not. Constant space, which is the whole reason to know it.
  chase(n, square_digits(n))
}

fn chase(slow: Int, fast: Int) -> Bool {
  case slow == fast {
    True -> slow == 1
    False -> chase(square_digits(slow), square_digits(square_digits(fast)))
  }
}

fn square_digits(n: Int) -> Int {
  case n {
    0 -> 0
    _ -> {
      let digit = n % 10
      digit * digit + square_digits(n / 10)
    }
  }
}
