import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_product([2, 3, -2, 4])",
      string.inspect(6),
      string.inspect(solution.max_product([2, 3, -2, 4])),
    ),
    #(
      "max_product([-2, 0, -1])",
      string.inspect(0),
      string.inspect(solution.max_product([-2, 0, -1])),
    ),
    #(
      "max_product([-2, 3, -4])",
      string.inspect(24),
      string.inspect(solution.max_product([-2, 3, -4])),
    ),
    #(
      "max_product([0])",
      string.inspect(0),
      string.inspect(solution.max_product([0])),
    ),
    #(
      "max_product([-2])",
      string.inspect(-2),
      string.inspect(solution.max_product([-2])),
    ),
    #(
      "max_product([2, -5, -2, -4, 3])",
      string.inspect(24),
      string.inspect(solution.max_product([2, -5, -2, -4, 3])),
    ),
    #(
      "max_product([])",
      string.inspect(0),
      string.inspect(solution.max_product([])),
    ),
  ]
}
