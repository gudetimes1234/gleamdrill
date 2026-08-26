import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "count_bits(5)",
      string.inspect([0, 1, 1, 2, 1, 2]),
      string.inspect(solution.count_bits(5)),
    ),
    #(
      "count_bits(2)",
      string.inspect([0, 1, 1]),
      string.inspect(solution.count_bits(2)),
    ),
    #(
      "count_bits(0)",
      string.inspect([0]),
      string.inspect(solution.count_bits(0)),
    ),
    #(
      "count_bits(8)",
      string.inspect([0, 1, 1, 2, 1, 2, 2, 3, 1]),
      string.inspect(solution.count_bits(8)),
    ),
  ]
}
