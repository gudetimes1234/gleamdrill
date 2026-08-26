import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "spiral_order([[1,2,3],[4,5,6],[7,8,9]])",
      string.inspect([1, 2, 3, 6, 9, 8, 7, 4, 5]),
      string.inspect(solution.spiral_order([[1, 2, 3], [4, 5, 6], [7, 8, 9]])),
    ),
    #(
      "spiral_order([[1,2,3,4],[5,6,7,8],[9,10,11,12]])",
      string.inspect([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]),
      string.inspect(
        solution.spiral_order([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]),
      ),
    ),
    #(
      "spiral_order([[1]])",
      string.inspect([1]),
      string.inspect(solution.spiral_order([[1]])),
    ),
    #(
      "spiral_order([])",
      string.inspect([]),
      string.inspect(solution.spiral_order([])),
    ),
    #(
      "spiral_order([[1,2,3]])",
      string.inspect([1, 2, 3]),
      string.inspect(solution.spiral_order([[1, 2, 3]])),
    ),
    #(
      "spiral_order([[1],[2],[3]])",
      string.inspect([1, 2, 3]),
      string.inspect(solution.spiral_order([[1], [2], [3]])),
    ),
  ]
}
