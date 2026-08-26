import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_area_of_island([[1,1,0],[1,0,0],[0,0,1]])",
      string.inspect(3),
      string.inspect(
        solution.max_area_of_island([[1, 1, 0], [1, 0, 0], [0, 0, 1]]),
      ),
    ),
    #(
      "max_area_of_island([[0,0],[0,0]])",
      string.inspect(0),
      string.inspect(solution.max_area_of_island([[0, 0], [0, 0]])),
    ),
    #(
      "max_area_of_island([])",
      string.inspect(0),
      string.inspect(solution.max_area_of_island([])),
    ),
    #(
      "max_area_of_island([[1]])",
      string.inspect(1),
      string.inspect(solution.max_area_of_island([[1]])),
    ),
    #(
      "max_area_of_island([[1,1,1],[1,1,1]])",
      string.inspect(6),
      string.inspect(solution.max_area_of_island([[1, 1, 1], [1, 1, 1]])),
    ),
  ]
}
