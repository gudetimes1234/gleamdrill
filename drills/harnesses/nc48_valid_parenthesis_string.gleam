import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "check_valid_string(\"()\")",
      string.inspect(True),
      string.inspect(solution.check_valid_string("()")),
    ),
    #(
      "check_valid_string(\"(*)\")",
      string.inspect(True),
      string.inspect(solution.check_valid_string("(*)")),
    ),
    #(
      "check_valid_string(\"(*))\")",
      string.inspect(True),
      string.inspect(solution.check_valid_string("(*))")),
    ),
    #(
      "check_valid_string(\")(\")",
      string.inspect(False),
      string.inspect(solution.check_valid_string(")(")),
    ),
    #(
      "check_valid_string(\"\")",
      string.inspect(True),
      string.inspect(solution.check_valid_string("")),
    ),
    #(
      "check_valid_string(\"*\")",
      string.inspect(True),
      string.inspect(solution.check_valid_string("*")),
    ),
    #(
      "check_valid_string(\")*\")",
      string.inspect(False),
      string.inspect(solution.check_valid_string(")*")),
    ),
    #(
      "check_valid_string(\"(*()\")",
      string.inspect(True),
      string.inspect(solution.check_valid_string("(*()")),
    ),
  ]
}
