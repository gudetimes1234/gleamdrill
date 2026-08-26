import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)",
      string.inspect([3, 3, 5, 5, 6, 7]),
      string.inspect(solution.max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)),
    ),
    #(
      "max_sliding_window([1], 1)",
      string.inspect([1]),
      string.inspect(solution.max_sliding_window([1], 1)),
    ),
    #(
      "max_sliding_window([], 3)",
      string.inspect([]),
      string.inspect(solution.max_sliding_window([], 3)),
    ),
    #(
      "max_sliding_window([9, 8, 7, 6], 2)",
      string.inspect([9, 8, 7]),
      string.inspect(solution.max_sliding_window([9, 8, 7, 6], 2)),
    ),
    #(
      "max_sliding_window([1, -1], 1)",
      string.inspect([1, -1]),
      string.inspect(solution.max_sliding_window([1, -1], 1)),
    ),
    #(
      "max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)",
      string.inspect([7, 7, 7, 7, 7]),
      string.inspect(solution.max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)),
    ),
  ]
}
