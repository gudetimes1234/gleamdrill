import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reverse([1, 2, 3])",
      string.inspect([3, 2, 1]),
      string.inspect(solution.reverse([1, 2, 3])),
    ),
    #(
      "reverse([])",
      string.inspect(no_ints),
      string.inspect(solution.reverse(no_ints)),
    ),
    #("sum([1, 2, 3])", string.inspect(6), string.inspect(solution.sum([1, 2, 3]))),
    #("sum([])", string.inspect(0), string.inspect(solution.sum([]))),
  ]
}
