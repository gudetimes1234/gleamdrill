import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_target_sum_ways([1, 1, 1, 1, 1], 3)",
      string.inspect(5),
      string.inspect(solution.find_target_sum_ways([1, 1, 1, 1, 1], 3)),
    ),
    #(
      "find_target_sum_ways([1], 1)",
      string.inspect(1),
      string.inspect(solution.find_target_sum_ways([1], 1)),
    ),
    #(
      "find_target_sum_ways([1], 2)",
      string.inspect(0),
      string.inspect(solution.find_target_sum_ways([1], 2)),
    ),
    #(
      "find_target_sum_ways([0, 0, 0, 0, 0], 0)",
      string.inspect(32),
      string.inspect(solution.find_target_sum_ways([0, 0, 0, 0, 0], 0)),
    ),
    #(
      "find_target_sum_ways([], 0)",
      string.inspect(1),
      string.inspect(solution.find_target_sum_ways([], 0)),
    ),
    #(
      "find_target_sum_ways([1, 2, 3, 4, 5], 3)",
      string.inspect(3),
      string.inspect(solution.find_target_sum_ways([1, 2, 3, 4, 5], 3)),
    ),
  ]
}
