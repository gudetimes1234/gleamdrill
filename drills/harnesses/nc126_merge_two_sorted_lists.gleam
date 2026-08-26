import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "merge_two_lists([1, 2, 4], [1, 3, 4])",
      string.inspect([1, 1, 2, 3, 4, 4]),
      string.inspect(solution.merge_two_lists([1, 2, 4], [1, 3, 4])),
    ),
    #(
      "merge_two_lists([], [])",
      string.inspect([]),
      string.inspect(solution.merge_two_lists([], [])),
    ),
    #(
      "merge_two_lists([], [0])",
      string.inspect([0]),
      string.inspect(solution.merge_two_lists([], [0])),
    ),
    #(
      "merge_two_lists([5], [1, 2, 3])",
      string.inspect([1, 2, 3, 5]),
      string.inspect(solution.merge_two_lists([5], [1, 2, 3])),
    ),
  ]
}
