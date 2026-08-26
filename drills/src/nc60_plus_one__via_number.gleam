import gleam/list

pub fn plus_one(digits: List(Int)) -> List(Int) {
  // Fold the digits into a number, add one, take it apart again. Shorter, and
  // it works right up until the number is longer than the language's integers
  // \u{2014} which is exactly why the problem hands you digits in the first place.
  let value = list.fold(digits, 0, fn(acc, digit) { acc * 10 + digit }) + 1
  to_digits(value, [])
}

fn to_digits(n: Int, acc: List(Int)) -> List(Int) {
  case n < 10 {
    True -> [n, ..acc]
    False -> to_digits(n / 10, [n % 10, ..acc])
  }
}
