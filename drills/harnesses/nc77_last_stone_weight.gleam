import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "last_stone_weight([2, 7, 4, 1, 8, 1])",
      string.inspect(1),
      string.inspect(solution.last_stone_weight([2, 7, 4, 1, 8, 1])),
    ),
    #(
      "last_stone_weight([1])",
      string.inspect(1),
      string.inspect(solution.last_stone_weight([1])),
    ),
    #(
      "last_stone_weight([])",
      string.inspect(0),
      string.inspect(solution.last_stone_weight([])),
    ),
    #(
      "last_stone_weight([2, 2])",
      string.inspect(0),
      string.inspect(solution.last_stone_weight([2, 2])),
    ),
    #(
      "last_stone_weight([3, 7, 2])",
      string.inspect(2),
      string.inspect(solution.last_stone_weight([3, 7, 2])),
    ),
    #(
      "last_stone_weight([10, 4, 2, 10])",
      string.inspect(2),
      string.inspect(solution.last_stone_weight([10, 4, 2, 10])),
    ),
  ]
}
