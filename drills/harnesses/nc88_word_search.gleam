import gleam/list
import gleam/string
import solution

const rows = ["ABCE", "SFCS", "ADEE"]

fn board() -> List(List(String)) {
  list.map(rows, string.to_graphemes)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "exist(board, \"ABCCED\")",
      string.inspect(True),
      string.inspect(solution.exist(board(), "ABCCED")),
    ),
    #(
      "exist(board, \"SEE\")",
      string.inspect(True),
      string.inspect(solution.exist(board(), "SEE")),
    ),
    #(
      "exist(board, \"ABCB\")",
      string.inspect(False),
      string.inspect(solution.exist(board(), "ABCB")),
    ),
    #(
      "exist(board, \"\")",
      string.inspect(True),
      string.inspect(solution.exist(board(), "")),
    ),
    #(
      "exist(board, \"Z\")",
      string.inspect(False),
      string.inspect(solution.exist(board(), "Z")),
    ),
    #(
      "exist([], \"A\")",
      string.inspect(False),
      string.inspect(solution.exist([], "A")),
    ),
  ]
}
