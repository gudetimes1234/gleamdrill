import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_min([3, 4, 5, 1, 2])",
      string.inspect(Ok(1)),
      string.inspect(solution.find_min([3, 4, 5, 1, 2])),
    ),
    #(
      "find_min([4, 5, 6, 7, 0, 1, 2])",
      string.inspect(Ok(0)),
      string.inspect(solution.find_min([4, 5, 6, 7, 0, 1, 2])),
    ),
    #(
      "find_min([11, 13, 15, 17])",
      string.inspect(Ok(11)),
      string.inspect(solution.find_min([11, 13, 15, 17])),
    ),
    #("find_min([2, 1])", string.inspect(Ok(1)), string.inspect(solution.find_min([2, 1]))),
  ]
}
