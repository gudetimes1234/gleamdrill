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
    _ -> build(string.to_graphemes(digits))
  }
}

/// One choice per digit, independently \u{2014} so the answer is the cross product
/// of the letter sets. Written as a recursion here: pick a letter for the first
/// digit, then every combination of the rest.
fn build(digits: List(String)) -> List(String) {
  case digits {
    [] -> [""]
    [first, ..rest] -> {
      let tails = build(rest)
      letters_for(first)
      |> list.flat_map(fn(letter) {
        list.map(tails, fn(tail) { letter <> tail })
      })
    }
  }
}

fn letters_for(digit: String) -> List(String) {
  case list.find(keypad, fn(entry: #(String, String)) { entry.0 == digit }) {
    Ok(#(_, letters)) -> string.to_graphemes(letters)
    Error(Nil) -> []
  }
}
