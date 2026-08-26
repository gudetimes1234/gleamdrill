import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_subtree(4/1/2 inside 3/4/5)",
      string.inspect(True),
      string.inspect(solution.is_subtree(
        Node(3, Node(4, bud(1), bud(2)), bud(5)),
        Node(4, bud(1), bud(2)),
      )),
    ),
    #(
      "is_subtree(a near match with an extra node)",
      string.inspect(False),
      string.inspect(solution.is_subtree(
        Node(3, Node(4, bud(1), Node(2, bud(0), Leaf)), bud(5)),
        Node(4, bud(1), bud(2)),
      )),
    ),
    #(
      "is_subtree(a tree is its own subtree)",
      string.inspect(True),
      string.inspect(solution.is_subtree(bud(1), bud(1))),
    ),
    #(
      "is_subtree(Leaf, a node)",
      string.inspect(False),
      string.inspect(solution.is_subtree(Leaf, bud(1))),
    ),
    #(
      "is_subtree(anything, Leaf)",
      string.inspect(True),
      string.inspect(solution.is_subtree(bud(1), Leaf)),
    ),
  ]
}
