import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "erase_overlap_intervals([#(1, 2), #(2, 3), #(3, 4), #(1, 3)])",
      string.inspect(1),
      string.inspect(
        solution.erase_overlap_intervals([
          #(1, 2),
          #(2, 3),
          #(3, 4),
          #(1, 3),
        ]),
      ),
    ),
    #(
      "erase_overlap_intervals([#(1, 2), #(1, 2), #(1, 2)])",
      string.inspect(2),
      string.inspect(
        solution.erase_overlap_intervals([
          #(1, 2),
          #(1, 2),
          #(1, 2),
        ]),
      ),
    ),
    #(
      "erase_overlap_intervals([#(1, 2), #(2, 3)])",
      string.inspect(0),
      string.inspect(solution.erase_overlap_intervals([#(1, 2), #(2, 3)])),
    ),
    #(
      "erase_overlap_intervals([])",
      string.inspect(0),
      string.inspect(solution.erase_overlap_intervals([])),
    ),
    #(
      "erase_overlap_intervals([#(1, 100), #(11, 22), #(1, 11), #(2, 12)])",
      string.inspect(2),
      string.inspect(
        solution.erase_overlap_intervals([
          #(1, 100),
          #(11, 22),
          #(1, 11),
          #(2, 12),
        ]),
      ),
    ),
  ]
}
