import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

const tree = Node(3, Node(1, Leaf, Node(2, Leaf, Leaf)), Node(4, Leaf, Leaf))

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "kth_smallest(tree, 1)",
      string.inspect(1),
      string.inspect(solution.kth_smallest(tree, 1)),
    ),
    #(
      "kth_smallest(tree, 2)",
      string.inspect(2),
      string.inspect(solution.kth_smallest(tree, 2)),
    ),
    #(
      "kth_smallest(tree, 3)",
      string.inspect(3),
      string.inspect(solution.kth_smallest(tree, 3)),
    ),
    #(
      "kth_smallest(tree, 4)",
      string.inspect(4),
      string.inspect(solution.kth_smallest(tree, 4)),
    ),
    #(
      "kth_smallest(a single node, 1)",
      string.inspect(7),
      string.inspect(solution.kth_smallest(bud(7), 1)),
    ),
  ]
}
