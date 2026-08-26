import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "has_cycle([1, 2, 3, 1]) — the tail loops back",
      string.inspect(True),
      string.inspect(solution.has_cycle([1, 2, 3, 1])),
    ),
    #(
      "has_cycle([1, 2, -1])",
      string.inspect(False),
      string.inspect(solution.has_cycle([1, 2, -1])),
    ),
    #(
      "has_cycle([-1]) — one node, no link",
      string.inspect(False),
      string.inspect(solution.has_cycle([-1])),
    ),
    #(
      "has_cycle([0]) — one node pointing at itself",
      string.inspect(True),
      string.inspect(solution.has_cycle([0])),
    ),
    #(
      "has_cycle([])",
      string.inspect(False),
      string.inspect(solution.has_cycle([])),
    ),
    #(
      "has_cycle([1, 0]) — two nodes pointing at each other",
      string.inspect(True),
      string.inspect(solution.has_cycle([1, 0])),
    ),
  ]
}
