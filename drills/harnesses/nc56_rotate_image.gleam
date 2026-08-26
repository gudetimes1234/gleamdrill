import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "rotate([[1,2,3],[4,5,6],[7,8,9]])",
      string.inspect([[7, 4, 1], [8, 5, 2], [9, 6, 3]]),
      string.inspect(solution.rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])),
    ),
    #(
      "rotate([[1,2],[3,4]])",
      string.inspect([[3, 1], [4, 2]]),
      string.inspect(solution.rotate([[1, 2], [3, 4]])),
    ),
    #(
      "rotate([[1]])",
      string.inspect([[1]]),
      string.inspect(solution.rotate([[1]])),
    ),
    #("rotate([])", string.inspect([]), string.inspect(solution.rotate([]))),
    #(
      "rotate(4x4)",
      string.inspect([
        [15, 13, 2, 5],
        [14, 3, 4, 1],
        [12, 6, 8, 9],
        [16, 7, 10, 11],
      ]),
      string.inspect(
        solution.rotate([
          [5, 1, 9, 11],
          [2, 4, 8, 10],
          [13, 3, 6, 7],
          [15, 14, 12, 16],
        ]),
      ),
    ),
  ]
}
