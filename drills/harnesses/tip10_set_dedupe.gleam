import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "dedupe([1, 2, 1, 3, 2])",
      string.inspect([1, 2, 3]),
      string.inspect(solution.dedupe([1, 2, 1, 3, 2])),
    ),
    #(
      "dedupe([]) ",
      string.inspect(no_ints),
      string.inspect(solution.dedupe(no_ints)),
    ),
    #(
      "dedupe([\"b\", \"a\", \"b\"])",
      string.inspect(["b", "a"]),
      string.inspect(solution.dedupe(["b", "a", "b"])),
    ),
  ]
}
