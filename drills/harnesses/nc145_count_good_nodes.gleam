import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "good_nodes(the 3/1/4 tree)",
      string.inspect(4),
      string.inspect(
        solution.good_nodes(Node(
          3,
          Node(1, bud(3), Leaf),
          Node(4, bud(1), bud(5)),
        )),
      ),
    ),
    #(
      "good_nodes(Leaf)",
      string.inspect(0),
      string.inspect(solution.good_nodes(Leaf)),
    ),
    #(
      "good_nodes(a single node)",
      string.inspect(1),
      string.inspect(solution.good_nodes(bud(1))),
    ),
    #(
      "good_nodes(equal counts as good)",
      string.inspect(2),
      string.inspect(solution.good_nodes(Node(2, bud(2), Leaf))),
    ),
    #(
      "good_nodes(a smaller node hides nothing below it)",
      string.inspect(3),
      string.inspect(
        solution.good_nodes(Node(3, Node(3, bud(4), bud(2)), Leaf)),
      ),
    ),
  ]
}
