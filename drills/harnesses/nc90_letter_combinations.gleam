import gleam/list
import gleam/string
import solution

fn sorted(digits: String) -> List(String) {
  list.sort(solution.letter_combinations(digits), string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "letter_combinations(\"23\")",
      string.inspect(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]),
      string.inspect(sorted("23")),
    ),
    #(
      "letter_combinations(\"\")",
      string.inspect([]),
      string.inspect(sorted("")),
    ),
    #(
      "letter_combinations(\"2\")",
      string.inspect(["a", "b", "c"]),
      string.inspect(sorted("2")),
    ),
    #(
      "letter_combinations(\"9\")",
      string.inspect(["w", "x", "y", "z"]),
      string.inspect(sorted("9")),
    ),
    #(
      "letter_combinations(\"79\") count",
      string.inspect(16),
      string.inspect(list.length(sorted("79"))),
    ),
  ]
}
