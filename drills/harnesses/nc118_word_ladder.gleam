import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "ladder_length(\"hit\", \"cog\", [hot, dot, dog, lot, log, cog])",
      string.inspect(5),
      string.inspect(
        solution.ladder_length("hit", "cog", [
          "hot",
          "dot",
          "dog",
          "lot",
          "log",
          "cog",
        ]),
      ),
    ),
    #(
      "ladder_length(\"hit\", \"cog\", without cog)",
      string.inspect(0),
      string.inspect(
        solution.ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log"]),
      ),
    ),
    #(
      "ladder_length(\"a\", \"c\", [a, b, c])",
      string.inspect(2),
      string.inspect(solution.ladder_length("a", "c", ["a", "b", "c"])),
    ),
    #(
      "ladder_length(\"hit\", \"hit\", [hit])",
      string.inspect(1),
      string.inspect(solution.ladder_length("hit", "hit", ["hit"])),
    ),
    #(
      "ladder_length(\"hot\", \"dog\", [hot, dog]) — no bridge",
      string.inspect(0),
      string.inspect(solution.ladder_length("hot", "dog", ["hot", "dog"])),
    ),
  ]
}
