import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_cost_connect_points(the five-point example)",
      string.inspect(20),
      string.inspect(
        solution.min_cost_connect_points([
          #(0, 0),
          #(2, 2),
          #(3, 10),
          #(5, 2),
          #(7, 0),
        ]),
      ),
    ),
    #(
      "min_cost_connect_points([#(3,12), #(-2,5), #(-4,1)])",
      string.inspect(18),
      string.inspect(
        solution.min_cost_connect_points([#(3, 12), #(-2, 5), #(-4, 1)]),
      ),
    ),
    #(
      "min_cost_connect_points([])",
      string.inspect(0),
      string.inspect(solution.min_cost_connect_points([])),
    ),
    #(
      "min_cost_connect_points([#(1,1)]) — nothing to connect",
      string.inspect(0),
      string.inspect(solution.min_cost_connect_points([#(1, 1)])),
    ),
    #(
      "min_cost_connect_points([#(0,0), #(0,5)])",
      string.inspect(5),
      string.inspect(solution.min_cost_connect_points([#(0, 0), #(0, 5)])),
    ),
  ]
}
