import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "character_replacement(\"ABAB\", 2)",
      string.inspect(4),
      string.inspect(solution.character_replacement("ABAB", 2)),
    ),
    #(
      "character_replacement(\"AABABBA\", 1)",
      string.inspect(4),
      string.inspect(solution.character_replacement("AABABBA", 1)),
    ),
    #(
      "character_replacement(\"AAAA\", 0)",
      string.inspect(4),
      string.inspect(solution.character_replacement("AAAA", 0)),
    ),
  ]
}
