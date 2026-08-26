import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "merge_k_lists([[1, 4, 5], [1, 3, 4], [2, 6]])",
      string.inspect([1, 1, 2, 3, 4, 4, 5, 6]),
      string.inspect(solution.merge_k_lists([[1, 4, 5], [1, 3, 4], [2, 6]])),
    ),
    #(
      "merge_k_lists([])",
      string.inspect([]),
      string.inspect(solution.merge_k_lists([])),
    ),
    #(
      "merge_k_lists([[]])",
      string.inspect([]),
      string.inspect(solution.merge_k_lists([[]])),
    ),
    #(
      "merge_k_lists([[1], [], [0]])",
      string.inspect([0, 1]),
      string.inspect(solution.merge_k_lists([[1], [], [0]])),
    ),
    #(
      "merge_k_lists([[2, 2], [2]])",
      string.inspect([2, 2, 2]),
      string.inspect(solution.merge_k_lists([[2, 2], [2]])),
    ),
  ]
}
