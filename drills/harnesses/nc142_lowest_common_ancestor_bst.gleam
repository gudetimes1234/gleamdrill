import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

const tree = Node(
  6,
  Node(
    2,
    Node(0, Leaf, Leaf),
    Node(4, Node(3, Leaf, Leaf), Node(5, Leaf, Leaf)),
  ),
  Node(8, Node(7, Leaf, Leaf), Node(9, Leaf, Leaf)),
)

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "lowest_common_ancestor(tree, 2, 8)",
      string.inspect(6),
      string.inspect(solution.lowest_common_ancestor(tree, 2, 8)),
    ),
    #(
      "lowest_common_ancestor(tree, 2, 4) -- an ancestor counts",
      string.inspect(2),
      string.inspect(solution.lowest_common_ancestor(tree, 2, 4)),
    ),
    #(
      "lowest_common_ancestor(tree, 3, 5)",
      string.inspect(4),
      string.inspect(solution.lowest_common_ancestor(tree, 3, 5)),
    ),
    #(
      "lowest_common_ancestor(tree, 7, 9)",
      string.inspect(8),
      string.inspect(solution.lowest_common_ancestor(tree, 7, 9)),
    ),
    #(
      "lowest_common_ancestor(a single node, 1, 1)",
      string.inspect(1),
      string.inspect(solution.lowest_common_ancestor(bud(1), 1, 1)),
    ),
  ]
}
