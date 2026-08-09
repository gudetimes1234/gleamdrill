import gleam/list
import gleam/string
import solution

/// Triples come back in set order, which is not meaningful.
fn normalise(triples: List(#(Int, Int, Int))) -> List(String) {
  triples |> list.map(string.inspect) |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "three_sum([-1, 0, 1, 2, -1, -4])",
      string.inspect(["#(-1, -1, 2)", "#(-1, 0, 1)"]),
      string.inspect(normalise(solution.three_sum([-1, 0, 1, 2, -1, -4]))),
    ),
    #(
      "three_sum([0, 1, 1])",
      string.inspect([]),
      string.inspect(normalise(solution.three_sum([0, 1, 1]))),
    ),
    #(
      "three_sum([0, 0, 0])",
      string.inspect(["#(0, 0, 0)"]),
      string.inspect(normalise(solution.three_sum([0, 0, 0]))),
    ),
  ]
}
