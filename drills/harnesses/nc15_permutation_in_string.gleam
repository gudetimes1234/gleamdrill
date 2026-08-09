import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "check_inclusion(\"ab\", \"eidbaooo\")",
      string.inspect(True),
      string.inspect(solution.check_inclusion("ab", "eidbaooo")),
    ),
    #(
      "check_inclusion(\"ab\", \"eidboaoo\")",
      string.inspect(False),
      string.inspect(solution.check_inclusion("ab", "eidboaoo")),
    ),
    #(
      "check_inclusion(\"adc\", \"dcda\")",
      string.inspect(True),
      string.inspect(solution.check_inclusion("adc", "dcda")),
    ),
  ]
}
