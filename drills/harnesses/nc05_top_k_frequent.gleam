import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "top_k_frequent([1, 1, 1, 2, 2, 3], 2)",
      string.inspect([1, 2]),
      string.inspect(solution.top_k_frequent([1, 1, 1, 2, 2, 3], 2)),
    ),
    #(
      "top_k_frequent([1], 1)",
      string.inspect([1]),
      string.inspect(solution.top_k_frequent([1], 1)),
    ),
    #(
      "top_k_frequent([5, 5, 4, 4, 4, 3], 1)",
      string.inspect([4]),
      string.inspect(solution.top_k_frequent([5, 5, 4, 4, 4, 3], 1)),
    ),
  ]
}
