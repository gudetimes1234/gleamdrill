import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_path_sum(1/2/3)",
      string.inspect(6),
      string.inspect(solution.max_path_sum(Node(1, bud(2), bud(3)))),
    ),
    #(
      "max_path_sum(-10/9/20)",
      string.inspect(42),
      string.inspect(
        solution.max_path_sum(Node(-10, bud(9), Node(20, bud(15), bud(7)))),
      ),
    ),
    #(
      "max_path_sum(a single negative node)",
      string.inspect(-3),
      string.inspect(solution.max_path_sum(bud(-3))),
    ),
    #(
      "max_path_sum(all negative)",
      string.inspect(-1),
      string.inspect(solution.max_path_sum(Node(-2, bud(-1), Leaf))),
    ),
    #(
      "max_path_sum(a single zero)",
      string.inspect(0),
      string.inspect(solution.max_path_sum(bud(0))),
    ),
  ]
}
