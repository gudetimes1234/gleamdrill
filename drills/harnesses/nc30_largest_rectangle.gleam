import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "largest_rectangle_area([2, 1, 5, 6, 2, 3])",
      string.inspect(10),
      string.inspect(solution.largest_rectangle_area([2, 1, 5, 6, 2, 3])),
    ),
    #(
      "largest_rectangle_area([2, 4])",
      string.inspect(4),
      string.inspect(solution.largest_rectangle_area([2, 4])),
    ),
    #(
      "largest_rectangle_area([])",
      string.inspect(0),
      string.inspect(solution.largest_rectangle_area([])),
    ),
    #(
      "largest_rectangle_area([1, 1, 1])",
      string.inspect(3),
      string.inspect(solution.largest_rectangle_area([1, 1, 1])),
    ),
    #(
      "largest_rectangle_area([5])",
      string.inspect(5),
      string.inspect(solution.largest_rectangle_area([5])),
    ),
    #(
      "largest_rectangle_area([4, 2, 0, 3, 2, 5])",
      string.inspect(6),
      string.inspect(solution.largest_rectangle_area([4, 2, 0, 3, 2, 5])),
    ),
  ]
}
