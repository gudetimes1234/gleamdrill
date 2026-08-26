import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "pacific_atlantic(the 5x5 example)",
      string.inspect([
        #(0, 4),
        #(1, 3),
        #(1, 4),
        #(2, 2),
        #(3, 0),
        #(3, 1),
        #(4, 0),
      ]),
      string.inspect(
        solution.pacific_atlantic([
          [1, 2, 2, 3, 5],
          [3, 2, 3, 4, 4],
          [2, 4, 5, 3, 1],
          [6, 7, 1, 4, 5],
          [5, 1, 1, 2, 4],
        ]),
      ),
    ),
    #(
      "pacific_atlantic([[1]])",
      string.inspect([#(0, 0)]),
      string.inspect(solution.pacific_atlantic([[1]])),
    ),
    #(
      "pacific_atlantic([])",
      string.inspect([]),
      string.inspect(solution.pacific_atlantic([])),
    ),
    #(
      "pacific_atlantic([[1,1],[1,1]])",
      string.inspect([#(0, 0), #(0, 1), #(1, 0), #(1, 1)]),
      string.inspect(solution.pacific_atlantic([[1, 1], [1, 1]])),
    ),
  ]
}
