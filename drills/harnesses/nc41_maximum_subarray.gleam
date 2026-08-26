import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4])",
      string.inspect(6),
      string.inspect(solution.max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4])),
    ),
    #(
      "max_sub_array([1])",
      string.inspect(1),
      string.inspect(solution.max_sub_array([1])),
    ),
    #(
      "max_sub_array([5, 4, -1, 7, 8])",
      string.inspect(23),
      string.inspect(solution.max_sub_array([5, 4, -1, 7, 8])),
    ),
    #(
      "max_sub_array([-1])",
      string.inspect(-1),
      string.inspect(solution.max_sub_array([-1])),
    ),
    #(
      "max_sub_array([-2, -1])",
      string.inspect(-1),
      string.inspect(solution.max_sub_array([-2, -1])),
    ),
    #(
      "max_sub_array([])",
      string.inspect(0),
      string.inspect(solution.max_sub_array([])),
    ),
  ]
}
