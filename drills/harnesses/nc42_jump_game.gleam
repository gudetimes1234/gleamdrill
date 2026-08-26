import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "can_jump([2, 3, 1, 1, 4])",
      string.inspect(True),
      string.inspect(solution.can_jump([2, 3, 1, 1, 4])),
    ),
    #(
      "can_jump([3, 2, 1, 0, 4])",
      string.inspect(False),
      string.inspect(solution.can_jump([3, 2, 1, 0, 4])),
    ),
    #(
      "can_jump([0])",
      string.inspect(True),
      string.inspect(solution.can_jump([0])),
    ),
    #(
      "can_jump([])",
      string.inspect(True),
      string.inspect(solution.can_jump([])),
    ),
    #(
      "can_jump([1, 0, 1, 0])",
      string.inspect(False),
      string.inspect(solution.can_jump([1, 0, 1, 0])),
    ),
    #(
      "can_jump([2, 0, 0])",
      string.inspect(True),
      string.inspect(solution.can_jump([2, 0, 0])),
    ),
  ]
}
