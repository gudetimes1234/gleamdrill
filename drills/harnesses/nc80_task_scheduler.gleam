import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "least_interval([A, A, A, B, B, B], 2)",
      string.inspect(8),
      string.inspect(solution.least_interval(["A", "A", "A", "B", "B", "B"], 2)),
    ),
    #(
      "least_interval([A, A, A, B, B, B], 0)",
      string.inspect(6),
      string.inspect(solution.least_interval(["A", "A", "A", "B", "B", "B"], 0)),
    ),
    #(
      "least_interval([A, A, A, B, B, B], 3)",
      string.inspect(10),
      string.inspect(solution.least_interval(["A", "A", "A", "B", "B", "B"], 3)),
    ),
    #(
      "least_interval([], 2)",
      string.inspect(0),
      string.inspect(solution.least_interval([], 2)),
    ),
    #(
      "least_interval([A], 5)",
      string.inspect(1),
      string.inspect(solution.least_interval(["A"], 5)),
    ),
    #(
      "least_interval(four As and six singles, 2)",
      string.inspect(10),
      string.inspect(solution.least_interval(
        ["A", "A", "A", "A", "B", "C", "D", "E", "F", "G"],
        2,
      )),
    ),
  ]
}
