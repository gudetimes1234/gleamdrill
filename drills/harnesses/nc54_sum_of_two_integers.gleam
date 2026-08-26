import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "get_sum(1, 2)",
      string.inspect(3),
      string.inspect(solution.get_sum(1, 2)),
    ),
    #(
      "get_sum(2, 3)",
      string.inspect(5),
      string.inspect(solution.get_sum(2, 3)),
    ),
    #(
      "get_sum(-1, 1)",
      string.inspect(0),
      string.inspect(solution.get_sum(-1, 1)),
    ),
    #(
      "get_sum(-2, -3)",
      string.inspect(-5),
      string.inspect(solution.get_sum(-2, -3)),
    ),
    #(
      "get_sum(0, 0)",
      string.inspect(0),
      string.inspect(solution.get_sum(0, 0)),
    ),
    #(
      "get_sum(-1, -1)",
      string.inspect(-2),
      string.inspect(solution.get_sum(-1, -1)),
    ),
    #(
      "get_sum(5, -3)",
      string.inspect(2),
      string.inspect(solution.get_sum(5, -3)),
    ),
  ]
}
