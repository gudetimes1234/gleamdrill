import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "contains_duplicate([1, 2, 3, 1])",
      string.inspect(True),
      string.inspect(solution.contains_duplicate([1, 2, 3, 1])),
    ),
    #(
      "contains_duplicate([1, 2, 3, 4])",
      string.inspect(False),
      string.inspect(solution.contains_duplicate([1, 2, 3, 4])),
    ),
    #(
      "contains_duplicate([])",
      string.inspect(False),
      string.inspect(solution.contains_duplicate([])),
    ),
    #(
      "contains_duplicate([7, 7])",
      string.inspect(True),
      string.inspect(solution.contains_duplicate([7, 7])),
    ),
  ]
}
