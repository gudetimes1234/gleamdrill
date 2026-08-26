import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "jump([2, 3, 1, 1, 4])",
      string.inspect(2),
      string.inspect(solution.jump([2, 3, 1, 1, 4])),
    ),
    #(
      "jump([2, 3, 0, 1, 4])",
      string.inspect(2),
      string.inspect(solution.jump([2, 3, 0, 1, 4])),
    ),
    #("jump([0])", string.inspect(0), string.inspect(solution.jump([0]))),
    #("jump([1])", string.inspect(0), string.inspect(solution.jump([1]))),
    #(
      "jump([1, 2, 3])",
      string.inspect(2),
      string.inspect(solution.jump([1, 2, 3])),
    ),
    #(
      "jump([1, 1, 1, 1])",
      string.inspect(3),
      string.inspect(solution.jump([1, 1, 1, 1])),
    ),
  ]
}
