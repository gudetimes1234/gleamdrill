import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "coin_change([1, 2, 5], 11)",
      string.inspect(3),
      string.inspect(solution.coin_change([1, 2, 5], 11)),
    ),
    #(
      "coin_change([2], 3)",
      string.inspect(-1),
      string.inspect(solution.coin_change([2], 3)),
    ),
    #(
      "coin_change([1], 0)",
      string.inspect(0),
      string.inspect(solution.coin_change([1], 0)),
    ),
    #(
      "coin_change([], 5)",
      string.inspect(-1),
      string.inspect(solution.coin_change([], 5)),
    ),
    #(
      "coin_change([1, 3, 4], 6)",
      string.inspect(2),
      string.inspect(solution.coin_change([1, 3, 4], 6)),
    ),
    #(
      "coin_change([2, 5, 10, 1], 27)",
      string.inspect(4),
      string.inspect(solution.coin_change([2, 5, 10, 1], 27)),
    ),
  ]
}
