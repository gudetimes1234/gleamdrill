import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "hamming_weight(11)",
      string.inspect(3),
      string.inspect(solution.hamming_weight(11)),
    ),
    #(
      "hamming_weight(128)",
      string.inspect(1),
      string.inspect(solution.hamming_weight(128)),
    ),
    #(
      "hamming_weight(0)",
      string.inspect(0),
      string.inspect(solution.hamming_weight(0)),
    ),
    #(
      "hamming_weight(2147483645)",
      string.inspect(30),
      string.inspect(solution.hamming_weight(2_147_483_645)),
    ),
    #(
      "hamming_weight(1)",
      string.inspect(1),
      string.inspect(solution.hamming_weight(1)),
    ),
  ]
}
