import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "num_distinct(\"rabbbit\", \"rabbit\")",
      string.inspect(3),
      string.inspect(solution.num_distinct("rabbbit", "rabbit")),
    ),
    #(
      "num_distinct(\"babgbag\", \"bag\")",
      string.inspect(5),
      string.inspect(solution.num_distinct("babgbag", "bag")),
    ),
    #(
      "num_distinct(\"\", \"a\")",
      string.inspect(0),
      string.inspect(solution.num_distinct("", "a")),
    ),
    #(
      "num_distinct(\"a\", \"\")",
      string.inspect(1),
      string.inspect(solution.num_distinct("a", "")),
    ),
    #(
      "num_distinct(\"abc\", \"abc\")",
      string.inspect(1),
      string.inspect(solution.num_distinct("abc", "abc")),
    ),
    #(
      "num_distinct(\"aaa\", \"aa\")",
      string.inspect(3),
      string.inspect(solution.num_distinct("aaa", "aa")),
    ),
  ]
}
