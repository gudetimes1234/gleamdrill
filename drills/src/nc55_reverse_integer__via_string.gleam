import gleam/int
import gleam/list
import gleam/result
import gleam/string

const largest = 2_147_483_647

const smallest = -2_147_483_648

pub fn reverse(x: Int) -> Int {
  let digits =
    int.absolute_value(x)
    |> int.to_string
    |> string.to_graphemes
    |> list.reverse
    |> string.concat

  let magnitude = digits |> int.parse |> result.unwrap(0)
  let signed = case x < 0 {
    True -> -magnitude
    False -> magnitude
  }

  // Reversing the text cannot overflow here, so the range check is a plain
  // comparison at the end rather than a guard inside the loop \u{2014} which is only
  // safe because the value is not held in 32 bits along the way.
  case signed > largest || signed < smallest {
    True -> 0
    False -> signed
  }
}
