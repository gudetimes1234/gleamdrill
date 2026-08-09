import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 0)",
      string.inspect(Ok(4)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 0)),
    ),
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 3)",
      string.inspect(Error(Nil)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 3)),
    ),
    #(
      "search_rotated([1], 1)",
      string.inspect(Ok(0)),
      string.inspect(solution.search_rotated([1], 1)),
    ),
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 6)",
      string.inspect(Ok(2)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 6)),
    ),
  ]
}
