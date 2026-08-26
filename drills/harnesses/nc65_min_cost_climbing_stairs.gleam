import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_cost_climbing_stairs([10, 15, 20])",
      string.inspect(15),
      string.inspect(solution.min_cost_climbing_stairs([10, 15, 20])),
    ),
    #(
      "min_cost_climbing_stairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])",
      string.inspect(6),
      string.inspect(
        solution.min_cost_climbing_stairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]),
      ),
    ),
    #(
      "min_cost_climbing_stairs([0, 0])",
      string.inspect(0),
      string.inspect(solution.min_cost_climbing_stairs([0, 0])),
    ),
    #(
      "min_cost_climbing_stairs([1, 2])",
      string.inspect(1),
      string.inspect(solution.min_cost_climbing_stairs([1, 2])),
    ),
    #(
      "min_cost_climbing_stairs([0, 1, 1, 0])",
      string.inspect(1),
      string.inspect(solution.min_cost_climbing_stairs([0, 1, 1, 0])),
    ),
    #(
      "min_cost_climbing_stairs([])",
      string.inspect(0),
      string.inspect(solution.min_cost_climbing_stairs([])),
    ),
  ]
}
