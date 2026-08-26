import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_median_sorted_arrays([1, 3], [2])",
      string.inspect(2.0),
      string.inspect(solution.find_median_sorted_arrays([1, 3], [2])),
    ),
    #(
      "find_median_sorted_arrays([1, 2], [3, 4])",
      string.inspect(2.5),
      string.inspect(solution.find_median_sorted_arrays([1, 2], [3, 4])),
    ),
    #(
      "find_median_sorted_arrays([], [1])",
      string.inspect(1.0),
      string.inspect(solution.find_median_sorted_arrays([], [1])),
    ),
    #(
      "find_median_sorted_arrays([2], [])",
      string.inspect(2.0),
      string.inspect(solution.find_median_sorted_arrays([2], [])),
    ),
    #(
      "find_median_sorted_arrays([], [])",
      string.inspect(0.0),
      string.inspect(solution.find_median_sorted_arrays([], [])),
    ),
    #(
      "find_median_sorted_arrays([1, 2], [])",
      string.inspect(1.5),
      string.inspect(solution.find_median_sorted_arrays([1, 2], [])),
    ),
    #(
      "find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6])",
      string.inspect(4.0),
      string.inspect(
        solution.find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6]),
      ),
    ),
  ]
}
