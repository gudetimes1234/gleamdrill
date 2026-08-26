import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "multiply(\"2\", \"3\")",
      string.inspect("6"),
      string.inspect(solution.multiply("2", "3")),
    ),
    #(
      "multiply(\"123\", \"456\")",
      string.inspect("56088"),
      string.inspect(solution.multiply("123", "456")),
    ),
    #(
      "multiply(\"0\", \"52\")",
      string.inspect("0"),
      string.inspect(solution.multiply("0", "52")),
    ),
    #(
      "multiply(\"9\", \"9\")",
      string.inspect("81"),
      string.inspect(solution.multiply("9", "9")),
    ),
    #(
      "multiply(\"999\", \"999\")",
      string.inspect("998001"),
      string.inspect(solution.multiply("999", "999")),
    ),
    #(
      "multiply(\"123456789\", \"987654321\")",
      string.inspect("121932631112635269"),
      string.inspect(solution.multiply("123456789", "987654321")),
    ),
  ]
}
