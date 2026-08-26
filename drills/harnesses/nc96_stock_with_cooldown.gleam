import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_profit([1, 2, 3, 0, 2])",
      string.inspect(3),
      string.inspect(solution.max_profit([1, 2, 3, 0, 2])),
    ),
    #(
      "max_profit([1])",
      string.inspect(0),
      string.inspect(solution.max_profit([1])),
    ),
    #(
      "max_profit([])",
      string.inspect(0),
      string.inspect(solution.max_profit([])),
    ),
    #(
      "max_profit([2, 1])",
      string.inspect(0),
      string.inspect(solution.max_profit([2, 1])),
    ),
    #(
      "max_profit([1, 2, 3, 4, 5])",
      string.inspect(4),
      string.inspect(solution.max_profit([1, 2, 3, 4, 5])),
    ),
    #(
      "max_profit([6, 1, 3, 2, 4, 7])",
      string.inspect(6),
      string.inspect(solution.max_profit([6, 1, 3, 2, 4, 7])),
    ),
  ]
}
