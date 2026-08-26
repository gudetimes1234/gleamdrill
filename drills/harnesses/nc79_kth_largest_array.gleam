import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_kth_largest([3, 2, 1, 5, 6, 4], 2)",
      string.inspect(Ok(5)),
      string.inspect(solution.find_kth_largest([3, 2, 1, 5, 6, 4], 2)),
    ),
    #(
      "find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)",
      string.inspect(Ok(4)),
      string.inspect(solution.find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)),
    ),
    #(
      "find_kth_largest([1], 1)",
      string.inspect(Ok(1)),
      string.inspect(solution.find_kth_largest([1], 1)),
    ),
    #(
      "find_kth_largest([2, 1], 2)",
      string.inspect(Ok(1)),
      string.inspect(solution.find_kth_largest([2, 1], 2)),
    ),
    #(
      "find_kth_largest([7, 6, 5, 4, 3, 2, 1], 3)",
      string.inspect(Ok(5)),
      string.inspect(solution.find_kth_largest([7, 6, 5, 4, 3, 2, 1], 3)),
    ),
    #(
      "find_kth_largest([], 1)",
      string.inspect(Error(Nil)),
      string.inspect(solution.find_kth_largest([], 1)),
    ),
  ]
}
