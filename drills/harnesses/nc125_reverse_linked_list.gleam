import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reverse_list([1, 2, 3, 4, 5])",
      string.inspect([5, 4, 3, 2, 1]),
      string.inspect(solution.reverse_list([1, 2, 3, 4, 5])),
    ),
    #(
      "reverse_list([1, 2])",
      string.inspect([2, 1]),
      string.inspect(solution.reverse_list([1, 2])),
    ),
    #(
      "reverse_list([])",
      string.inspect([]),
      string.inspect(solution.reverse_list([])),
    ),
    #(
      "reverse_list([7])",
      string.inspect([7]),
      string.inspect(solution.reverse_list([7])),
    ),
  ]
}
