import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "oranges_rotting([[2,1,1],[1,1,0],[0,1,1]])",
      string.inspect(4),
      string.inspect(
        solution.oranges_rotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]),
      ),
    ),
    #(
      "oranges_rotting([[2,1,1],[0,1,1],[1,0,1]])",
      string.inspect(-1),
      string.inspect(
        solution.oranges_rotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]),
      ),
    ),
    #(
      "oranges_rotting([[0,2]])",
      string.inspect(0),
      string.inspect(solution.oranges_rotting([[0, 2]])),
    ),
    #(
      "oranges_rotting([])",
      string.inspect(0),
      string.inspect(solution.oranges_rotting([])),
    ),
    #(
      "oranges_rotting([[1]])",
      string.inspect(-1),
      string.inspect(solution.oranges_rotting([[1]])),
    ),
    #(
      "oranges_rotting([[0]])",
      string.inspect(0),
      string.inspect(solution.oranges_rotting([[0]])),
    ),
  ]
}
