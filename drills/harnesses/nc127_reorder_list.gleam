import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reorder_list([1, 2, 3, 4])",
      string.inspect([1, 4, 2, 3]),
      string.inspect(solution.reorder_list([1, 2, 3, 4])),
    ),
    #(
      "reorder_list([1, 2, 3, 4, 5])",
      string.inspect([1, 5, 2, 4, 3]),
      string.inspect(solution.reorder_list([1, 2, 3, 4, 5])),
    ),
    #(
      "reorder_list([1, 2])",
      string.inspect([1, 2]),
      string.inspect(solution.reorder_list([1, 2])),
    ),
    #(
      "reorder_list([1])",
      string.inspect([1]),
      string.inspect(solution.reorder_list([1])),
    ),
    #(
      "reorder_list([])",
      string.inspect([]),
      string.inspect(solution.reorder_list([])),
    ),
  ]
}
