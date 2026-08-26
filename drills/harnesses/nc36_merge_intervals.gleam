import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "merge([#(1, 3), #(2, 6), #(8, 10), #(15, 18)])",
      string.inspect([#(1, 6), #(8, 10), #(15, 18)]),
      string.inspect(solution.merge([#(1, 3), #(2, 6), #(8, 10), #(15, 18)])),
    ),
    #(
      "merge([#(1, 4), #(4, 5)])",
      string.inspect([#(1, 5)]),
      string.inspect(solution.merge([#(1, 4), #(4, 5)])),
    ),
    #("merge([])", string.inspect([]), string.inspect(solution.merge([]))),
    #(
      "merge([#(1, 4), #(0, 4)])",
      string.inspect([#(0, 4)]),
      string.inspect(solution.merge([#(1, 4), #(0, 4)])),
    ),
    #(
      "merge([#(1, 4), #(2, 3)])",
      string.inspect([#(1, 4)]),
      string.inspect(solution.merge([#(1, 4), #(2, 3)])),
    ),
  ]
}
