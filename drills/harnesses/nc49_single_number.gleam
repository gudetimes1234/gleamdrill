import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "single_number([2, 2, 1])",
      string.inspect(1),
      string.inspect(solution.single_number([2, 2, 1])),
    ),
    #(
      "single_number([4, 1, 2, 1, 2])",
      string.inspect(4),
      string.inspect(solution.single_number([4, 1, 2, 1, 2])),
    ),
    #(
      "single_number([1])",
      string.inspect(1),
      string.inspect(solution.single_number([1])),
    ),
    #(
      "single_number([-1, -1, -3])",
      string.inspect(-3),
      string.inspect(solution.single_number([-1, -1, -3])),
    ),
    #(
      "single_number([0, 1, 1])",
      string.inspect(0),
      string.inspect(solution.single_number([0, 1, 1])),
    ),
  ]
}
