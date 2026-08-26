import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_valid_bst(2/1/3)",
      string.inspect(True),
      string.inspect(solution.is_valid_bst(Node(2, bud(1), bud(3)))),
    ),
    #(
      "is_valid_bst(Leaf)",
      string.inspect(True),
      string.inspect(solution.is_valid_bst(Leaf)),
    ),
    #(
      "is_valid_bst(a single node)",
      string.inspect(True),
      string.inspect(solution.is_valid_bst(bud(1))),
    ),
    #(
      "is_valid_bst(5/1/4 with 3 and 6 below 4)",
      string.inspect(False),
      string.inspect(
        solution.is_valid_bst(Node(5, bud(1), Node(4, bud(3), bud(6)))),
      ),
    ),
    #(
      "is_valid_bst(every node beats its parent, but 3 is on the wrong side)",
      string.inspect(False),
      string.inspect(
        solution.is_valid_bst(Node(5, bud(4), Node(6, bud(3), bud(7)))),
      ),
    ),
    #(
      "is_valid_bst(equal values are not allowed)",
      string.inspect(False),
      string.inspect(solution.is_valid_bst(Node(2, bud(2), Leaf))),
    ),
  ]
}
