import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_eating_speed([3, 6, 7, 11], 8)",
      string.inspect(4),
      string.inspect(solution.min_eating_speed([3, 6, 7, 11], 8)),
    ),
    #(
      "min_eating_speed([30, 11, 23, 4, 20], 5)",
      string.inspect(30),
      string.inspect(solution.min_eating_speed([30, 11, 23, 4, 20], 5)),
    ),
    #(
      "min_eating_speed([30, 11, 23, 4, 20], 6)",
      string.inspect(23),
      string.inspect(solution.min_eating_speed([30, 11, 23, 4, 20], 6)),
    ),
    #(
      "min_eating_speed([1], 1)",
      string.inspect(1),
      string.inspect(solution.min_eating_speed([1], 1)),
    ),
    #(
      "min_eating_speed([4, 4, 4, 4], 4)",
      string.inspect(4),
      string.inspect(solution.min_eating_speed([4, 4, 4, 4], 4)),
    ),
    #(
      "min_eating_speed([1, 1, 1, 10], 4)",
      string.inspect(10),
      string.inspect(solution.min_eating_speed([1, 1, 1, 10], 4)),
    ),
  ]
}
