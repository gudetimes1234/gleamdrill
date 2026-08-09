import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_valid(\"()[]{}\")",
      string.inspect(True),
      string.inspect(solution.is_valid("()[]{}")),
    ),
    #(
      "is_valid(\"(]\")",
      string.inspect(False),
      string.inspect(solution.is_valid("(]")),
    ),
    #(
      "is_valid(\"([)]\")",
      string.inspect(False),
      string.inspect(solution.is_valid("([)]")),
    ),
    #(
      "is_valid(\"{[]}\")",
      string.inspect(True),
      string.inspect(solution.is_valid("{[]}")),
    ),
    #("is_valid(\"(\")", string.inspect(False), string.inspect(solution.is_valid("("))),
  ]
}
