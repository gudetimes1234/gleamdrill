import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "clone_graph([[1,3],[0,2],[1,3],[0,2]], 0)",
      string.inspect([[1, 3], [0, 2], [1, 3], [0, 2]]),
      string.inspect(solution.clone_graph([[1, 3], [0, 2], [1, 3], [0, 2]], 0)),
    ),
    #(
      "clone_graph([[1],[0]], 0)",
      string.inspect([[1], [0]]),
      string.inspect(solution.clone_graph([[1], [0]], 0)),
    ),
    #(
      "clone_graph([[]], 0)",
      string.inspect([[]]),
      string.inspect(solution.clone_graph([[]], 0)),
    ),
    #(
      "clone_graph([], 0)",
      string.inspect([]),
      string.inspect(solution.clone_graph([], 0)),
    ),
    #(
      "clone_graph([[], []], 1) — only the reachable part",
      string.inspect([[]]),
      string.inspect(solution.clone_graph([[], []], 1)),
    ),
  ]
}
