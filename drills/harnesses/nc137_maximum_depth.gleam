import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_depth(the 3/9/20 tree)",
      string.inspect(3),
      string.inspect(
        solution.max_depth(Node(3, bud(9), Node(20, bud(15), bud(7)))),
      ),
    ),
    #(
      "max_depth(Leaf)",
      string.inspect(0),
      string.inspect(solution.max_depth(Leaf)),
    ),
    #(
      "max_depth(a single node)",
      string.inspect(1),
      string.inspect(solution.max_depth(bud(1))),
    ),
    #(
      "max_depth(a spindly tree)",
      string.inspect(3),
      string.inspect(solution.max_depth(Node(1, Node(2, bud(3), Leaf), Leaf))),
    ),
  ]
}
