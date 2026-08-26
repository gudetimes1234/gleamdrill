import gleam/int
import gleam/list

pub fn reverse_bits(n: Int) -> Int {
  // Peel the bottom bit off the input and push it onto the bottom of the
  // result: the first bit out is the last bit in. Fixed at 32 rounds, because
  // the width is part of the problem rather than a property of the value.
  let #(_, reversed) =
    list.fold(list.repeat(Nil, 32), #(n, 0), fn(state, _) {
      let #(remaining, reversed) = state
      #(
        int.bitwise_shift_right(remaining, 1),
        int.bitwise_or(
          int.bitwise_shift_left(reversed, 1),
          int.bitwise_and(remaining, 1),
        ),
      )
    })
  reversed
}
