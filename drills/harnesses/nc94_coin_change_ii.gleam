import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "change(5, [1, 2, 5])",
      string.inspect(4),
      string.inspect(solution.change(5, [1, 2, 5])),
    ),
    #(
      "change(3, [2])",
      string.inspect(0),
      string.inspect(solution.change(3, [2])),
    ),
    #(
      "change(10, [10])",
      string.inspect(1),
      string.inspect(solution.change(10, [10])),
    ),
    #(
      "change(0, [1])",
      string.inspect(1),
      string.inspect(solution.change(0, [1])),
    ),
    #(
      "change(5, [])",
      string.inspect(0),
      string.inspect(solution.change(5, [])),
    ),
    #(
      "change(11, [1, 2, 5])",
      string.inspect(11),
      string.inspect(solution.change(11, [1, 2, 5])),
    ),
  ]
}
