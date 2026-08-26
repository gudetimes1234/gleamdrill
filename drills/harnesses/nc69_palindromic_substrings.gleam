import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "count_substrings(\"abc\")",
      string.inspect(3),
      string.inspect(solution.count_substrings("abc")),
    ),
    #(
      "count_substrings(\"aaa\")",
      string.inspect(6),
      string.inspect(solution.count_substrings("aaa")),
    ),
    #(
      "count_substrings(\"\")",
      string.inspect(0),
      string.inspect(solution.count_substrings("")),
    ),
    #(
      "count_substrings(\"a\")",
      string.inspect(1),
      string.inspect(solution.count_substrings("a")),
    ),
    #(
      "count_substrings(\"aba\")",
      string.inspect(4),
      string.inspect(solution.count_substrings("aba")),
    ),
    #(
      "count_substrings(\"abccba\")",
      string.inspect(9),
      string.inspect(solution.count_substrings("abccba")),
    ),
  ]
}
