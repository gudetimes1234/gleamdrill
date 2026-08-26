import gleam/set.{type Set}

pub fn is_happy(n: Int) -> Bool {
  // The sequence has to repeat eventually \u{2014} squares of digits are bounded, so
  // there are only finitely many values it can reach. Remembering what has been
  // seen turns "does it loop?" into a set lookup.
  walk(n, set.new())
}

fn walk(n: Int, seen: Set(Int)) -> Bool {
  case n == 1, set.contains(seen, n) {
    True, _ -> True
    _, True -> False
    _, _ -> walk(square_digits(n), set.insert(seen, n))
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
