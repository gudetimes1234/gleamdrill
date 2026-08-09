import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #("length([1, 2, 3])", string.inspect(3), string.inspect(solution.length([1, 2, 3]))),
    #("length([])", string.inspect(0), string.inspect(solution.length(no_ints))),
    #("last([1, 2, 3])", string.inspect(Ok(3)), string.inspect(solution.last([1, 2, 3]))),
    #(
      "last([])",
      string.inspect(Error(Nil)),
      string.inspect(solution.last(no_ints)),
    ),
  ]
}
