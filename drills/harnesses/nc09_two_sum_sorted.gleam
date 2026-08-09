import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "two_sum_sorted([2, 7, 11, 15], 9)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum_sorted([2, 7, 11, 15], 9)),
    ),
    #(
      "two_sum_sorted([2, 3, 4], 6)",
      string.inspect(Ok(#(1, 3))),
      string.inspect(solution.two_sum_sorted([2, 3, 4], 6)),
    ),
    #(
      "two_sum_sorted([-1, 0], -1)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum_sorted([-1, 0], -1)),
    ),
    #(
      "two_sum_sorted([1, 2, 3], 100)",
      string.inspect(Error(Nil)),
      string.inspect(solution.two_sum_sorted([1, 2, 3], 100)),
    ),
  ]
}
