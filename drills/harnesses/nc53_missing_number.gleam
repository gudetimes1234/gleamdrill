import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "missing_number([3, 0, 1])",
      string.inspect(2),
      string.inspect(solution.missing_number([3, 0, 1])),
    ),
    #(
      "missing_number([0, 1])",
      string.inspect(2),
      string.inspect(solution.missing_number([0, 1])),
    ),
    #(
      "missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1])",
      string.inspect(8),
      string.inspect(solution.missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1])),
    ),
    #(
      "missing_number([0])",
      string.inspect(1),
      string.inspect(solution.missing_number([0])),
    ),
    #(
      "missing_number([1])",
      string.inspect(0),
      string.inspect(solution.missing_number([1])),
    ),
    #(
      "missing_number([])",
      string.inspect(0),
      string.inspect(solution.missing_number([])),
    ),
  ]
}
