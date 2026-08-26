import gleam/int
import gleam/list

pub fn eval_rpn(tokens: List(String)) -> Int {
  case list.fold(tokens, [], step) {
    [answer, ..] -> answer
    [] -> 0
  }
}

/// Gleam's integer division already truncates towards zero, which is what the
/// problem asks for and what most languages' `//` does not do for negatives.
fn step(stack: List(Int), token: String) -> List(Int) {
  case token, stack {
    "+", [b, a, ..rest] -> [a + b, ..rest]
    "-", [b, a, ..rest] -> [a - b, ..rest]
    "*", [b, a, ..rest] -> [a * b, ..rest]
    "/", [b, a, ..rest] -> [a / b, ..rest]
    _, _ ->
      case int.parse(token) {
        Ok(n) -> [n, ..stack]
        Error(Nil) -> stack
      }
  }
}
