import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn multiply(num1: String, num2: String) -> String {
  case num1 == "0" || num2 == "0" {
    True -> "0"
    False -> {
      let a = reversed_digits(num1)
      let b = reversed_digits(num2)

      // Long multiplication with the carrying postponed. Digit i of one number
      // times digit j of the other always lands at position i + j, so every
      // product can be dropped straight into its slot and the carries settled
      // in one sweep at the end.
      let slots =
        list.index_fold(a, dict.new(), fn(acc, x, i) {
          list.index_fold(b, acc, fn(acc, y, j) {
            dict.insert(acc, i + j, at(acc, i + j) + x * y)
          })
        })

      render(slots, list.length(a) + list.length(b))
    }
  }
}

fn render(slots: Dict(Int, Int), width: Int) -> String {
  let #(digits, _) =
    list.fold(positions(width), #([], 0), fn(state, i) {
      let #(digits, carry) = state
      let total = at(slots, i) + carry
      #([total % 10, ..digits], total / 10)
    })

  digits
  |> list.drop_while(fn(digit) { digit == 0 })
  |> list.map(int.to_string)
  |> string.concat
}

fn reversed_digits(text: String) -> List(Int) {
  text
  |> string.to_graphemes
  |> list.reverse
  |> list.map(fn(c) { result.unwrap(int.parse(c), 0) })
}

fn positions(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

fn at(slots: Dict(Int, Int), key: Int) -> Int {
  result.unwrap(dict.get(slots, key), 0)
}
