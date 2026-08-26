import gleam/list
import gleam/string

pub fn check_valid_string(s: String) -> Bool {
  let graphemes = string.to_graphemes(s)
  // Two one-sided checks. Left to right with every star an opener asks whether
  // there are ever too many closers; right to left with every star a closer
  // asks whether there are ever too many openers. Passing both is exactly the
  // condition, and each pass is the ordinary balance check.
  never_negative(graphemes, "(", ")")
  && never_negative(list.reverse(graphemes), ")", "(")
}

fn never_negative(
  graphemes: List(String),
  credit: String,
  debit: String,
) -> Bool {
  let #(_, ok) =
    list.fold(graphemes, #(0, True), fn(state, c) {
      let #(balance, ok) = state
      let balance = case c {
        _ if c == debit -> balance - 1
        _ if c == credit -> balance + 1
        _ -> balance + 1
      }
      #(balance, ok && balance >= 0)
    })
  ok
}
