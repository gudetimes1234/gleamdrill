import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "rob([1, 2, 3, 1])",
      string.inspect(4),
      string.inspect(solution.rob([1, 2, 3, 1])),
    ),
    #(
      "rob([2, 7, 9, 3, 1])",
      string.inspect(12),
      string.inspect(solution.rob([2, 7, 9, 3, 1])),
    ),
    #("rob([5])", string.inspect(5), string.inspect(solution.rob([5]))),
    #("rob([])", string.inspect(0), string.inspect(solution.rob([]))),
    #(
      "rob([2, 1, 1, 2])",
      string.inspect(4),
      string.inspect(solution.rob([2, 1, 1, 2])),
    ),
    #("rob([1, 2])", string.inspect(2), string.inspect(solution.rob([1, 2]))),
  ]
}
