import gleam/int

const mask = 0xFFFFFFFF

const largest = 0x7FFFFFFF

pub fn get_sum(a: Int, b: Int) -> Int {
  // Addition without +. XOR is addition that forgets to carry; AND finds
  // exactly the places a carry was owed, and shifting it left one puts it where
  // it belongs. Repeat until nothing is owed.
  let result = add(int.bitwise_and(a, mask), int.bitwise_and(b, mask))
  case result <= largest {
    True -> result
    // Gleam integers are arbitrary precision, so negatives have to be put back
    // by hand: a 32-bit pattern above the signed maximum is a negative number.
    False -> int.bitwise_not(int.bitwise_exclusive_or(result, mask))
  }
}

fn add(a: Int, b: Int) -> Int {
  case b {
    0 -> a
    _ ->
      add(
        int.bitwise_and(int.bitwise_exclusive_or(a, b), mask),
        int.bitwise_and(int.bitwise_shift_left(int.bitwise_and(a, b), 1), mask),
      )
  }
}
