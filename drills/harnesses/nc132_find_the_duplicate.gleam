import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_duplicate([1, 3, 4, 2, 2])",
      string.inspect(2),
      string.inspect(solution.find_duplicate([1, 3, 4, 2, 2])),
    ),
    #(
      "find_duplicate([3, 1, 3, 4, 2])",
      string.inspect(3),
      string.inspect(solution.find_duplicate([3, 1, 3, 4, 2])),
    ),
    #(
      "find_duplicate([1, 1])",
      string.inspect(1),
      string.inspect(solution.find_duplicate([1, 1])),
    ),
    #(
      "find_duplicate([2, 2, 2, 2, 2])",
      string.inspect(2),
      string.inspect(solution.find_duplicate([2, 2, 2, 2, 2])),
    ),
    #(
      "find_duplicate([1, 4, 4, 2, 4])",
      string.inspect(4),
      string.inspect(solution.find_duplicate([1, 4, 4, 2, 4])),
    ),
  ]
}
