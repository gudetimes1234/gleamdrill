import gleam/int
import gleam/list

const mask = 0xFFFFFFFF

const largest = 0x7FFFFFFF

pub fn get_sum(a: Int, b: Int) -> Int {
  // The same addition written as hardware: thirty-two full adders in a row,
  // each taking two input bits and a carry and producing a sum bit and a carry
  // out. Slower than the XOR loop, which stops as soon as no carries are left,
  // but it is where the XOR loop comes from.
  let positions = list.index_map(list.repeat(Nil, 32), fn(_, i) { i })

  let #(result, _carry) =
    list.fold(positions, #(0, 0), fn(state, i) {
      let #(result, carry) = state
      let x = bit(a, i)
      let y = bit(b, i)
      let xor = int.bitwise_exclusive_or(x, y)
      #(
        int.bitwise_or(
          result,
          int.bitwise_shift_left(int.bitwise_exclusive_or(xor, carry), i),
        ),
        int.bitwise_or(int.bitwise_and(x, y), int.bitwise_and(carry, xor)),
      )
    })

  case result <= largest {
    True -> result
    False -> int.bitwise_not(int.bitwise_exclusive_or(result, mask))
  }
}

fn bit(value: Int, at: Int) -> Int {
  int.bitwise_and(int.bitwise_shift_right(value, at), 1)
}
