import gleam/int
import gleam/list
import gleam/string

pub fn longest_common_subsequence(text1: String, text2: String) -> Int {
  let a = string.to_graphemes(text1)
  let b = string.to_graphemes(text2)

  // Compare the last characters: equal means both are used and the answer is
  // one more than the rest, different means the best of dropping one or the
  // other. Filled row by row, only the previous row is ever needed.
  a
  |> list.fold(list.repeat(0, list.length(b) + 1), fn(previous, from_a) {
    row(previous, b, from_a)
  })
  |> list.last
  |> fn(final) {
    case final {
      Ok(length) -> length
      Error(Nil) -> 0
    }
  }
}

fn row(previous: List(Int), b: List(String), from_a: String) -> List(Int) {
  let #(_, _, built) =
    list.fold(b, #(previous, 0, [0]), fn(state, from_b) {
      let #(remaining, left, built) = state
      let #(diagonal, above) = case remaining {
        [d, a, ..] -> #(d, a)
        [d] -> #(d, 0)
        [] -> #(0, 0)
      }
      let here = case from_a == from_b {
        True -> diagonal + 1
        False -> int.max(above, left)
      }
      #(list.drop(remaining, 1), here, [here, ..built])
    })
  list.reverse(built)
}
