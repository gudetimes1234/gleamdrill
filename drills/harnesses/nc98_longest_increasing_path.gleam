import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "longest_increasing_path([[9, 9, 4], [6, 6, 8], [2, 1, 1]])",
      string.inspect(4),
      string.inspect(
        solution.longest_increasing_path([[9, 9, 4], [6, 6, 8], [2, 1, 1]]),
      ),
    ),
    #(
      "longest_increasing_path([[3, 4, 5], [3, 2, 6], [2, 2, 1]])",
      string.inspect(4),
      string.inspect(
        solution.longest_increasing_path([[3, 4, 5], [3, 2, 6], [2, 2, 1]]),
      ),
    ),
    #(
      "longest_increasing_path([[1]])",
      string.inspect(1),
      string.inspect(solution.longest_increasing_path([[1]])),
    ),
    #(
      "longest_increasing_path([])",
      string.inspect(0),
      string.inspect(solution.longest_increasing_path([])),
    ),
    #(
      "longest_increasing_path([[1, 2], [3, 4]])",
      string.inspect(3),
      string.inspect(solution.longest_increasing_path([[1, 2], [3, 4]])),
    ),
  ]
}
