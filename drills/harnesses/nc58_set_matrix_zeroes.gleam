import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "set_zeroes([[1,1,1],[1,0,1],[1,1,1]])",
      string.inspect([[1, 0, 1], [0, 0, 0], [1, 0, 1]]),
      string.inspect(solution.set_zeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]])),
    ),
    #(
      "set_zeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])",
      string.inspect([[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]),
      string.inspect(
        solution.set_zeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]),
      ),
    ),
    #(
      "set_zeroes([[1]])",
      string.inspect([[1]]),
      string.inspect(solution.set_zeroes([[1]])),
    ),
    #(
      "set_zeroes([[0]])",
      string.inspect([[0]]),
      string.inspect(solution.set_zeroes([[0]])),
    ),
    #(
      "set_zeroes([])",
      string.inspect([]),
      string.inspect(solution.set_zeroes([])),
    ),
    #(
      "set_zeroes([[1,2],[3,4]])",
      string.inspect([[1, 2], [3, 4]]),
      string.inspect(solution.set_zeroes([[1, 2], [3, 4]])),
    ),
  ]
}
