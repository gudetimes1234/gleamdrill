import gleam/list
import gleam/string

const keypad = [
  #("2", "abc"),
  #("3", "def"),
  #("4", "ghi"),
  #("5", "jkl"),
  #("6", "mno"),
  #("7", "pqrs"),
  #("8", "tuv"),
  #("9", "wxyz"),
]

pub fn letter_combinations(digits: String) -> List(String) {
  case digits {
    "" -> []
    _ ->
      // The same cross product built by folding rather than recursing: hold
      // every combination of the digits seen so far and extend each by every
      // letter of the next. No call stack, and the growth is visible \u{2014} the
      // list multiplies in size at each step.
      digits
      |> string.to_graphemes
      |> list.fold([""], fn(combinations, digit) {
        list.flat_map(combinations, fn(prefix) {
          list.map(letters_for(digit), fn(letter) { prefix <> letter })
        })
      })
  }
}

fn letters_for(digit: String) -> List(String) {
  case list.find(keypad, fn(entry: #(String, String)) { entry.0 == digit }) {
    Ok(#(_, letters)) -> string.to_graphemes(letters)
    Error(Nil) -> []
  }
}
