import gleam/list
import gleam/string
import solution

/// Any order is acceptable, so every case compares sorted.
fn sorted(n: Int) -> List(String) {
  list.sort(solution.generate_parenthesis(n), string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "generate_parenthesis(1)",
      string.inspect(["()"]),
      string.inspect(sorted(1)),
    ),
    #(
      "generate_parenthesis(2)",
      string.inspect(["(())", "()()"]),
      string.inspect(sorted(2)),
    ),
    #(
      "generate_parenthesis(3)",
      string.inspect(["((()))", "(()())", "(())()", "()(())", "()()()"]),
      string.inspect(sorted(3)),
    ),
    #(
      "generate_parenthesis(4) count",
      string.inspect(14),
      string.inspect(list.length(sorted(4))),
    ),
  ]
}
