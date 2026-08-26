import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "num_decodings(\"12\")",
      string.inspect(2),
      string.inspect(solution.num_decodings("12")),
    ),
    #(
      "num_decodings(\"226\")",
      string.inspect(3),
      string.inspect(solution.num_decodings("226")),
    ),
    #(
      "num_decodings(\"06\")",
      string.inspect(0),
      string.inspect(solution.num_decodings("06")),
    ),
    #(
      "num_decodings(\"0\")",
      string.inspect(0),
      string.inspect(solution.num_decodings("0")),
    ),
    #(
      "num_decodings(\"\")",
      string.inspect(0),
      string.inspect(solution.num_decodings("")),
    ),
    #(
      "num_decodings(\"10\")",
      string.inspect(1),
      string.inspect(solution.num_decodings("10")),
    ),
    #(
      "num_decodings(\"2101\")",
      string.inspect(1),
      string.inspect(solution.num_decodings("2101")),
    ),
    #(
      "num_decodings(\"11106\")",
      string.inspect(2),
      string.inspect(solution.num_decodings("11106")),
    ),
  ]
}
