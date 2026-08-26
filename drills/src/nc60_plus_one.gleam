import gleam/list

pub fn plus_one(digits: List(Int)) -> List(Int) {
  // Adding one is a carry that starts at 1 and dies as soon as a digit below
  // nine absorbs it. The only interesting case is when it never does, and the
  // number grows a digit.
  let #(carry, result) =
    digits
    |> list.reverse
    |> list.fold(#(1, []), fn(state, digit) {
      let #(carry, acc) = state
      let sum = digit + carry
      #(sum / 10, [sum % 10, ..acc])
    })

  case carry {
    0 -> result
    _ -> [carry, ..result]
  }
}
