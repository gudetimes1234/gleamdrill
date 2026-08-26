import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "climb_stairs(2)",
      string.inspect(2),
      string.inspect(solution.climb_stairs(2)),
    ),
    #(
      "climb_stairs(3)",
      string.inspect(3),
      string.inspect(solution.climb_stairs(3)),
    ),
    #(
      "climb_stairs(1)",
      string.inspect(1),
      string.inspect(solution.climb_stairs(1)),
    ),
    #(
      "climb_stairs(0)",
      string.inspect(1),
      string.inspect(solution.climb_stairs(0)),
    ),
    #(
      "climb_stairs(10)",
      string.inspect(89),
      string.inspect(solution.climb_stairs(10)),
    ),
    #(
      "climb_stairs(45)",
      string.inspect(1_836_311_903),
      string.inspect(solution.climb_stairs(45)),
    ),
  ]
}
