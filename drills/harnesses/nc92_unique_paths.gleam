import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "unique_paths(3, 7)",
      string.inspect(28),
      string.inspect(solution.unique_paths(3, 7)),
    ),
    #(
      "unique_paths(3, 2)",
      string.inspect(3),
      string.inspect(solution.unique_paths(3, 2)),
    ),
    #(
      "unique_paths(7, 3)",
      string.inspect(28),
      string.inspect(solution.unique_paths(7, 3)),
    ),
    #(
      "unique_paths(1, 5)",
      string.inspect(1),
      string.inspect(solution.unique_paths(1, 5)),
    ),
    #(
      "unique_paths(0, 5)",
      string.inspect(0),
      string.inspect(solution.unique_paths(0, 5)),
    ),
    #(
      "unique_paths(10, 10)",
      string.inspect(48_620),
      string.inspect(solution.unique_paths(10, 10)),
    ),
  ]
}
