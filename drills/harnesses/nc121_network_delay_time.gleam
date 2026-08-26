import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "network_delay_time([#(2,1,1), #(2,3,1), #(3,4,1)], 4, 2)",
      string.inspect(2),
      string.inspect(solution.network_delay_time(
        [#(2, 1, 1), #(2, 3, 1), #(3, 4, 1)],
        4,
        2,
      )),
    ),
    #(
      "network_delay_time([#(1,2,1)], 2, 1)",
      string.inspect(1),
      string.inspect(solution.network_delay_time([#(1, 2, 1)], 2, 1)),
    ),
    #(
      "network_delay_time([#(1,2,1)], 2, 2) — node 1 is unreachable",
      string.inspect(-1),
      string.inspect(solution.network_delay_time([#(1, 2, 1)], 2, 2)),
    ),
    #(
      "network_delay_time([], 1, 1)",
      string.inspect(0),
      string.inspect(solution.network_delay_time([], 1, 1)),
    ),
    #(
      "network_delay_time(the long way round is shorter, 3, 1)",
      string.inspect(3),
      string.inspect(solution.network_delay_time(
        [#(1, 2, 1), #(2, 3, 2), #(1, 3, 4)],
        3,
        1,
      )),
    ),
  ]
}
