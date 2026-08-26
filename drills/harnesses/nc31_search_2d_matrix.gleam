import gleam/string
import solution

const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search_matrix(matrix, 3)",
      string.inspect(True),
      string.inspect(solution.search_matrix(matrix, 3)),
    ),
    #(
      "search_matrix(matrix, 13)",
      string.inspect(False),
      string.inspect(solution.search_matrix(matrix, 13)),
    ),
    #(
      "search_matrix(matrix, 60)",
      string.inspect(True),
      string.inspect(solution.search_matrix(matrix, 60)),
    ),
    #(
      "search_matrix([[1]], 1)",
      string.inspect(True),
      string.inspect(solution.search_matrix([[1]], 1)),
    ),
    #(
      "search_matrix([], 1)",
      string.inspect(False),
      string.inspect(solution.search_matrix([], 1)),
    ),
    #(
      "search_matrix([[1], [3], [5]], 5)",
      string.inspect(True),
      string.inspect(solution.search_matrix([[1], [3], [5]], 5)),
    ),
  ]
}
