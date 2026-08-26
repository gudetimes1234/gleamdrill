import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "my_pow(2.0, 10)",
      string.inspect(1024.0),
      string.inspect(solution.my_pow(2.0, 10)),
    ),
    #(
      "my_pow(2.0, -2)",
      string.inspect(0.25),
      string.inspect(solution.my_pow(2.0, -2)),
    ),
    #(
      "my_pow(2.0, 0)",
      string.inspect(1.0),
      string.inspect(solution.my_pow(2.0, 0)),
    ),
    #(
      "my_pow(0.5, 3)",
      string.inspect(0.125),
      string.inspect(solution.my_pow(0.5, 3)),
    ),
    #(
      "my_pow(-2.0, 3)",
      string.inspect(-8.0),
      string.inspect(solution.my_pow(-2.0, 3)),
    ),
    #(
      "my_pow(2.0, 1)",
      string.inspect(2.0),
      string.inspect(solution.my_pow(2.0, 1)),
    ),
    #(
      "my_pow(0.0, 5)",
      string.inspect(0.0),
      string.inspect(solution.my_pow(0.0, 5)),
    ),
  ]
}
