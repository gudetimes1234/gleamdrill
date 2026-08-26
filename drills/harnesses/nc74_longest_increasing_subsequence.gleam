import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "length_of_lis([10, 9, 2, 5, 3, 7, 101, 18])",
      string.inspect(4),
      string.inspect(solution.length_of_lis([10, 9, 2, 5, 3, 7, 101, 18])),
    ),
    #(
      "length_of_lis([0, 1, 0, 3, 2, 3])",
      string.inspect(4),
      string.inspect(solution.length_of_lis([0, 1, 0, 3, 2, 3])),
    ),
    #(
      "length_of_lis([7, 7, 7, 7, 7, 7, 7])",
      string.inspect(1),
      string.inspect(solution.length_of_lis([7, 7, 7, 7, 7, 7, 7])),
    ),
    #(
      "length_of_lis([])",
      string.inspect(0),
      string.inspect(solution.length_of_lis([])),
    ),
    #(
      "length_of_lis([1])",
      string.inspect(1),
      string.inspect(solution.length_of_lis([1])),
    ),
    #(
      "length_of_lis([4, 10, 4, 3, 8, 9])",
      string.inspect(3),
      string.inspect(solution.length_of_lis([4, 10, 4, 3, 8, 9])),
    ),
  ]
}
