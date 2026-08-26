import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "eval_rpn([\"2\", \"1\", \"+\", \"3\", \"*\"])",
      string.inspect(9),
      string.inspect(solution.eval_rpn(["2", "1", "+", "3", "*"])),
    ),
    #(
      "eval_rpn([\"4\", \"13\", \"5\", \"/\", \"+\"])",
      string.inspect(6),
      string.inspect(solution.eval_rpn(["4", "13", "5", "/", "+"])),
    ),
    #(
      "eval_rpn([\"-3\", \"2\", \"/\"])",
      string.inspect(-1),
      string.inspect(solution.eval_rpn(["-3", "2", "/"])),
    ),
    #(
      "eval_rpn([\"5\"])",
      string.inspect(5),
      string.inspect(solution.eval_rpn(["5"])),
    ),
    #(
      "eval_rpn(the long one)",
      string.inspect(22),
      string.inspect(
        solution.eval_rpn([
          "10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+",
        ]),
      ),
    ),
  ]
}
