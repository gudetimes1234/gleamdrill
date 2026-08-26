import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "can_partition([1, 5, 11, 5])",
      string.inspect(True),
      string.inspect(solution.can_partition([1, 5, 11, 5])),
    ),
    #(
      "can_partition([1, 2, 3, 5])",
      string.inspect(False),
      string.inspect(solution.can_partition([1, 2, 3, 5])),
    ),
    #(
      "can_partition([2, 2])",
      string.inspect(True),
      string.inspect(solution.can_partition([2, 2])),
    ),
    #(
      "can_partition([1])",
      string.inspect(False),
      string.inspect(solution.can_partition([1])),
    ),
    #(
      "can_partition([1, 1])",
      string.inspect(True),
      string.inspect(solution.can_partition([1, 1])),
    ),
    #(
      "can_partition([3, 3, 3, 4, 5])",
      string.inspect(True),
      string.inspect(solution.can_partition([3, 3, 3, 4, 5])),
    ),
  ]
}
