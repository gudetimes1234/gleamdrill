import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_profit([7, 1, 5, 3, 6, 4])",
      string.inspect(5),
      string.inspect(solution.max_profit([7, 1, 5, 3, 6, 4])),
    ),
    #(
      "max_profit([7, 6, 4, 3, 1])",
      string.inspect(0),
      string.inspect(solution.max_profit([7, 6, 4, 3, 1])),
    ),
    #(
      "max_profit([])",
      string.inspect(0),
      string.inspect(solution.max_profit([])),
    ),
  ]
}
