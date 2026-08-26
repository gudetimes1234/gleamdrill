import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_n_straight_hand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)",
      string.inspect(True),
      string.inspect(solution.is_n_straight_hand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)),
    ),
    #(
      "is_n_straight_hand([1, 2, 3, 4, 5], 4)",
      string.inspect(False),
      string.inspect(solution.is_n_straight_hand([1, 2, 3, 4, 5], 4)),
    ),
    #(
      "is_n_straight_hand([1, 2, 3, 4, 5, 6], 2)",
      string.inspect(True),
      string.inspect(solution.is_n_straight_hand([1, 2, 3, 4, 5, 6], 2)),
    ),
    #(
      "is_n_straight_hand([], 1)",
      string.inspect(True),
      string.inspect(solution.is_n_straight_hand([], 1)),
    ),
    #(
      "is_n_straight_hand([1, 1, 2, 2, 3, 3], 3)",
      string.inspect(True),
      string.inspect(solution.is_n_straight_hand([1, 1, 2, 2, 3, 3], 3)),
    ),
    #(
      "is_n_straight_hand([8, 10, 12], 3)",
      string.inspect(False),
      string.inspect(solution.is_n_straight_hand([8, 10, 12], 3)),
    ),
  ]
}
