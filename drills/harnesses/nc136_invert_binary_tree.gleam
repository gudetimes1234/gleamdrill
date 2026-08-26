import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "invert_tree(the 4/2/7 tree)",
      string.inspect(Node(4, Node(7, bud(9), bud(6)), Node(2, bud(3), bud(1)))),
      string.inspect(
        solution.invert_tree(Node(
          4,
          Node(2, bud(1), bud(3)),
          Node(7, bud(6), bud(9)),
        )),
      ),
    ),
    #(
      "invert_tree(Leaf)",
      string.inspect(Leaf),
      string.inspect(solution.invert_tree(Leaf)),
    ),
    #(
      "invert_tree(a single node)",
      string.inspect(bud(1)),
      string.inspect(solution.invert_tree(bud(1))),
    ),
    #(
      "invert_tree twice is the original",
      string.inspect(Node(1, bud(2), Leaf)),
      string.inspect(
        solution.invert_tree(solution.invert_tree(Node(1, bud(2), Leaf))),
      ),
    ),
  ]
}
