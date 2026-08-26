import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_coins([3, 1, 5, 8])",
      string.inspect(167),
      string.inspect(solution.max_coins([3, 1, 5, 8])),
    ),
    #(
      "max_coins([1, 5])",
      string.inspect(10),
      string.inspect(solution.max_coins([1, 5])),
    ),
    #(
      "max_coins([])",
      string.inspect(0),
      string.inspect(solution.max_coins([])),
    ),
    #(
      "max_coins([5])",
      string.inspect(5),
      string.inspect(solution.max_coins([5])),
    ),
    #(
      "max_coins([1, 2, 3, 4])",
      string.inspect(40),
      string.inspect(solution.max_coins([1, 2, 3, 4])),
    ),
  ]
}
