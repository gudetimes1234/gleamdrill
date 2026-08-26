import gleam/list
import gleam/string
import solution

fn board(rows: List(String)) -> List(List(String)) {
  list.map(rows, string.to_graphemes)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "num_islands(one big island)",
      string.inspect(1),
      string.inspect(
        solution.num_islands(board(["11110", "11010", "11000", "00000"])),
      ),
    ),
    #(
      "num_islands(three islands)",
      string.inspect(3),
      string.inspect(
        solution.num_islands(board(["11000", "11000", "00100", "00011"])),
      ),
    ),
    #(
      "num_islands(all water)",
      string.inspect(0),
      string.inspect(solution.num_islands(board(["000", "000"]))),
    ),
    #(
      "num_islands([])",
      string.inspect(0),
      string.inspect(solution.num_islands([])),
    ),
    #(
      "num_islands(diagonal squares are separate)",
      string.inspect(2),
      string.inspect(solution.num_islands(board(["10", "01"]))),
    ),
  ]
}
