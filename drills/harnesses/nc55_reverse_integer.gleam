import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reverse(123)",
      string.inspect(321),
      string.inspect(solution.reverse(123)),
    ),
    #(
      "reverse(-123)",
      string.inspect(-321),
      string.inspect(solution.reverse(-123)),
    ),
    #("reverse(120)", string.inspect(21), string.inspect(solution.reverse(120))),
    #("reverse(0)", string.inspect(0), string.inspect(solution.reverse(0))),
    #(
      "reverse(1534236469)",
      string.inspect(0),
      string.inspect(solution.reverse(1_534_236_469)),
    ),
    #(
      "reverse(-2147483648)",
      string.inspect(0),
      string.inspect(solution.reverse(-2_147_483_648)),
    ),
    #(
      "reverse(1463847412)",
      string.inspect(2_147_483_641),
      string.inspect(solution.reverse(1_463_847_412)),
    ),
  ]
}
