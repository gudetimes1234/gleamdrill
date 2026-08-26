import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "rob([2, 3, 2])",
      string.inspect(3),
      string.inspect(solution.rob([2, 3, 2])),
    ),
    #(
      "rob([1, 2, 3, 1])",
      string.inspect(4),
      string.inspect(solution.rob([1, 2, 3, 1])),
    ),
    #(
      "rob([1, 2, 3])",
      string.inspect(3),
      string.inspect(solution.rob([1, 2, 3])),
    ),
    #("rob([1])", string.inspect(1), string.inspect(solution.rob([1]))),
    #("rob([])", string.inspect(0), string.inspect(solution.rob([]))),
    #("rob([1, 2])", string.inspect(2), string.inspect(solution.rob([1, 2]))),
  ]
}
