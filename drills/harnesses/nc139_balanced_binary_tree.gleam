import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_balanced(the 3/9/20 tree)",
      string.inspect(True),
      string.inspect(
        solution.is_balanced(Node(3, bud(9), Node(20, bud(15), bud(7)))),
      ),
    ),
    #(
      "is_balanced(Leaf)",
      string.inspect(True),
      string.inspect(solution.is_balanced(Leaf)),
    ),
    #(
      "is_balanced(a single node)",
      string.inspect(True),
      string.inspect(solution.is_balanced(bud(1))),
    ),
    #(
      "is_balanced(the classic unbalanced tree)",
      string.inspect(False),
      string.inspect(
        solution.is_balanced(Node(
          1,
          Node(2, Node(3, bud(4), bud(4)), bud(3)),
          bud(2),
        )),
      ),
    ),
    #(
      "is_balanced(balanced at the root, not below)",
      string.inspect(False),
      string.inspect(
        solution.is_balanced(Node(
          1,
          Node(2, Node(3, bud(4), Leaf), Leaf),
          bud(2),
        )),
      ),
    ),
  ]
}
