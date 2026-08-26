import gleam/int
import gleam/list
import gleam/result

pub fn eval_rpn(tokens: List(String)) -> Int {
  let #(value, _) = take(list.reverse(tokens))
  value
}

/// Read right to left: the last token is the outermost operator, and each
/// operator takes its right operand first because that is what sits nearer the
/// end. Returns the value and whatever is left to read.
fn take(rest: List(String)) -> #(Int, List(String)) {
  case rest {
    [] -> #(0, [])
    [token, ..tail] ->
      case token {
        "+" | "-" | "*" | "/" -> {
          let #(right, tail) = take(tail)
          let #(left, tail) = take(tail)
          #(apply(token, left, right), tail)
        }
        _ -> #(result.unwrap(int.parse(token), 0), tail)
      }
  }
}

fn apply(operator: String, left: Int, right: Int) -> Int {
  case operator {
    "+" -> left + right
    "-" -> left - right
    "*" -> left * right
    _ -> left / right
  }
}
