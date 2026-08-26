import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_same_tree(two identical trees)",
      string.inspect(True),
      string.inspect(solution.is_same_tree(
        Node(1, bud(2), bud(3)),
        Node(1, bud(2), bud(3)),
      )),
    ),
    #(
      "is_same_tree(Leaf, Leaf)",
      string.inspect(True),
      string.inspect(solution.is_same_tree(Leaf, Leaf)),
    ),
    #(
      "is_same_tree(Leaf, a node)",
      string.inspect(False),
      string.inspect(solution.is_same_tree(Leaf, bud(1))),
    ),
    #(
      "is_same_tree(same values, mirrored)",
      string.inspect(False),
      string.inspect(solution.is_same_tree(
        Node(1, bud(2), Leaf),
        Node(1, Leaf, bud(2)),
      )),
    ),
    #(
      "is_same_tree(children swapped)",
      string.inspect(False),
      string.inspect(solution.is_same_tree(
        Node(1, bud(2), bud(1)),
        Node(1, bud(1), bud(2)),
      )),
    ),
  ]
}
