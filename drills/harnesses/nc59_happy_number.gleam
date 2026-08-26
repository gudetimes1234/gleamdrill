import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_happy(19)",
      string.inspect(True),
      string.inspect(solution.is_happy(19)),
    ),
    #(
      "is_happy(2)",
      string.inspect(False),
      string.inspect(solution.is_happy(2)),
    ),
    #("is_happy(1)", string.inspect(True), string.inspect(solution.is_happy(1))),
    #("is_happy(7)", string.inspect(True), string.inspect(solution.is_happy(7))),
    #(
      "is_happy(4)",
      string.inspect(False),
      string.inspect(solution.is_happy(4)),
    ),
    #(
      "is_happy(100)",
      string.inspect(True),
      string.inspect(solution.is_happy(100)),
    ),
  ]
}
