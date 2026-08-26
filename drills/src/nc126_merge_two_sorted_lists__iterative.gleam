import gleam/list

pub fn merge_two_lists(first: List(Int), second: List(Int)) -> List(Int) {
  // The same merge with the recursion turned into a loop: build the answer
  // backwards in an accumulator and reverse once at the end. That accumulator
  // is the functional equivalent of the dummy head the imperative version
  // keeps, and reversing costs one extra pass rather than one extra frame per
  // node.
  list.reverse(step(first, second, []))
}

fn step(first: List(Int), second: List(Int), merged: List(Int)) -> List(Int) {
  case first, second {
    [], rest -> list.fold(rest, merged, fn(acc, value) { [value, ..acc] })
    rest, [] -> list.fold(rest, merged, fn(acc, value) { [value, ..acc] })
    [a, ..a_rest], [b, ..b_rest] ->
      case a <= b {
        True -> step(a_rest, second, [a, ..merged])
        False -> step(first, b_rest, [b, ..merged])
      }
  }
}
