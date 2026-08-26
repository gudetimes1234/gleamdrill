import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_interval([#(1, 4), #(2, 4), #(3, 6), #(4, 4)], [2, 3, 4, 5])",
      string.inspect([3, 3, 1, 4]),
      string.inspect(
        solution.min_interval([#(1, 4), #(2, 4), #(3, 6), #(4, 4)], [2, 3, 4, 5]),
      ),
    ),
    #(
      "min_interval([#(2, 3), #(2, 5), #(1, 8), #(20, 25)], [2, 19, 5, 22])",
      string.inspect([2, -1, 4, 6]),
      string.inspect(
        solution.min_interval([#(2, 3), #(2, 5), #(1, 8), #(20, 25)], [
          2,
          19,
          5,
          22,
        ]),
      ),
    ),
    #(
      "min_interval([], [1, 2])",
      string.inspect([-1, -1]),
      string.inspect(solution.min_interval([], [1, 2])),
    ),
    #(
      "min_interval([#(1, 10)], [])",
      string.inspect([]),
      string.inspect(solution.min_interval([#(1, 10)], [])),
    ),
    #(
      "min_interval([#(1, 3)], [0, 4])",
      string.inspect([-1, -1]),
      string.inspect(solution.min_interval([#(1, 3)], [0, 4])),
    ),
  ]
}
