import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn multiply(num1: String, num2: String) -> String {
  case num1 == "0" || num2 == "0" {
    True -> "0"
    False ->
      // Long multiplication exactly as taught: one partial product per digit of
      // the second number, each shifted left by its position, all added up. It
      // needs string addition as well as string multiplication, which is why
      // the accumulating version exists \u{2014} but writing add once is worth it.
      num2
      |> string.to_graphemes
      |> list.reverse
      |> list.index_map(fn(digit, shift) {
        times_digit(num1, result.unwrap(int.parse(digit), 0))
        <> string.repeat("0", shift)
      })
      |> list.fold("0", add)
  }
}

/// One string times one digit, right to left.
fn times_digit(number: String, digit: Int) -> String {
  let #(carry, digits) =
    number
    |> reversed_digits
    |> list.fold(#(0, []), fn(state, d) {
      let #(carry, acc) = state
      let total = d * digit + carry
      #(total / 10, [total % 10, ..acc])
    })

  trim(case carry {
    0 -> digits
    _ -> [carry, ..digits]
  })
}

/// Two numbers as strings, added right to left with a carry.
fn add(left: String, right: String) -> String {
  let a = reversed_digits(left)
  let b = reversed_digits(right)
  let width = int.max(list.length(a), list.length(b))

  let #(carry, digits) =
    list.index_map(list.repeat(Nil, width), fn(_, i) { i })
    |> list.fold(#(0, []), fn(state, i) {
      let #(carry, acc) = state
      let total = nth(a, i) + nth(b, i) + carry
      #(total / 10, [total % 10, ..acc])
    })

  trim(case carry {
    0 -> digits
    _ -> [carry, ..digits]
  })
}

fn trim(digits: List(Int)) -> String {
  case
    digits
    |> list.drop_while(fn(digit) { digit == 0 })
    |> list.map(int.to_string)
    |> string.concat
  {
    "" -> "0"
    text -> text
  }
}

fn reversed_digits(text: String) -> List(Int) {
  text
  |> string.to_graphemes
  |> list.reverse
  |> list.map(fn(c) { result.unwrap(int.parse(c), 0) })
}

fn nth(digits: List(Int), index: Int) -> Int {
  digits |> list.drop(index) |> list.first |> result.unwrap(0)
}
