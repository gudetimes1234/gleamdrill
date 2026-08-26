import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reverse_bits(43261596)",
      string.inspect(964_176_192),
      string.inspect(solution.reverse_bits(43_261_596)),
    ),
    #(
      "reverse_bits(4294967293)",
      string.inspect(3_221_225_471),
      string.inspect(solution.reverse_bits(4_294_967_293)),
    ),
    #(
      "reverse_bits(0)",
      string.inspect(0),
      string.inspect(solution.reverse_bits(0)),
    ),
    #(
      "reverse_bits(1)",
      string.inspect(2_147_483_648),
      string.inspect(solution.reverse_bits(1)),
    ),
  ]
}
