import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "walls_and_gates(the classic 4x4)",
      string.inspect([
        [3, -1, 0, 1],
        [2, 2, 1, -1],
        [1, -1, 2, -1],
        [0, -1, 3, 4],
      ]),
      string.inspect(
        solution.walls_and_gates([
          [2_147_483_647, -1, 0, 2_147_483_647],
          [2_147_483_647, 2_147_483_647, 2_147_483_647, -1],
          [2_147_483_647, -1, 2_147_483_647, -1],
          [0, -1, 2_147_483_647, 2_147_483_647],
        ]),
      ),
    ),
    #(
      "walls_and_gates([[0]])",
      string.inspect([[0]]),
      string.inspect(solution.walls_and_gates([[0]])),
    ),
    #(
      "walls_and_gates([[-1]])",
      string.inspect([[-1]]),
      string.inspect(solution.walls_and_gates([[-1]])),
    ),
    #(
      "walls_and_gates([])",
      string.inspect([]),
      string.inspect(solution.walls_and_gates([])),
    ),
    #(
      "walls_and_gates(no gate at all, so nothing changes)",
      string.inspect([[2_147_483_647, 2_147_483_647]]),
      string.inspect(solution.walls_and_gates([[2_147_483_647, 2_147_483_647]])),
    ),
  ]
}
