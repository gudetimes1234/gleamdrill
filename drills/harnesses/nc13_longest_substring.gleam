import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "length_of_longest_substring(\"abcabcbb\")",
      string.inspect(3),
      string.inspect(solution.length_of_longest_substring("abcabcbb")),
    ),
    #(
      "length_of_longest_substring(\"bbbbb\")",
      string.inspect(1),
      string.inspect(solution.length_of_longest_substring("bbbbb")),
    ),
    #(
      "length_of_longest_substring(\"pwwkew\")",
      string.inspect(3),
      string.inspect(solution.length_of_longest_substring("pwwkew")),
    ),
    #(
      "length_of_longest_substring(\"\")",
      string.inspect(0),
      string.inspect(solution.length_of_longest_substring("")),
    ),
  ]
}
