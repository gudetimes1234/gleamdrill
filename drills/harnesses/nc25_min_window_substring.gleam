import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_window(\"ADOBECODEBANC\", \"ABC\")",
      string.inspect("BANC"),
      string.inspect(solution.min_window("ADOBECODEBANC", "ABC")),
    ),
    #(
      "min_window(\"a\", \"a\")",
      string.inspect("a"),
      string.inspect(solution.min_window("a", "a")),
    ),
    #(
      "min_window(\"a\", \"aa\")",
      string.inspect(""),
      string.inspect(solution.min_window("a", "aa")),
    ),
    #(
      "min_window(\"\", \"a\")",
      string.inspect(""),
      string.inspect(solution.min_window("", "a")),
    ),
    #(
      "min_window(\"ab\", \"\")",
      string.inspect(""),
      string.inspect(solution.min_window("ab", "")),
    ),
    #(
      "min_window(\"aaflslflsldkalskaaa\", \"aaa\")",
      string.inspect("aaa"),
      string.inspect(solution.min_window("aaflslflsldkalskaaa", "aaa")),
    ),
  ]
}
