import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "product_except_self([1, 2, 3, 4])",
      string.inspect([24, 12, 8, 6]),
      string.inspect(solution.product_except_self([1, 2, 3, 4])),
    ),
    #(
      "product_except_self([-1, 1, 0, -3, 3])",
      string.inspect([0, 0, 9, 0, 0]),
      string.inspect(solution.product_except_self([-1, 1, 0, -3, 3])),
    ),
    #(
      "product_except_self([2, 3])",
      string.inspect([3, 2]),
      string.inspect(solution.product_except_self([2, 3])),
    ),
  ]
}
