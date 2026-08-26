import gleam/list

pub fn add_two_numbers(first: List(Int), second: List(Int)) -> List(Int) {
  // Turn both lists into whole numbers, add, and take the sum apart again. It
  // reads well and is fine in Gleam, whose integers are arbitrary precision —
  // but it is the version that breaks the moment the language has a fixed-width
  // integer, which is precisely why the problem is posed as a list of digits.
  to_digits(value(first) + value(second))
}

fn value(digits: List(Int)) -> Int {
  list.index_fold(digits, 0, fn(total, digit, i) {
    total + digit * power_of_ten(i)
  })
}

fn power_of_ten(n: Int) -> Int {
  case n <= 0 {
    True -> 1
    False -> 10 * power_of_ten(n - 1)
  }
}

fn to_digits(number: Int) -> List(Int) {
  case number < 10 {
    True -> [number]
    False -> [number % 10, ..to_digits(number / 10)]
  }
}
