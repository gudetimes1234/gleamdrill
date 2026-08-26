import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "diameter_of_binary_tree(the 1/2/3 tree)",
      string.inspect(3),
      string.inspect(
        solution.diameter_of_binary_tree(Node(
          1,
          Node(2, bud(4), bud(5)),
          bud(3),
        )),
      ),
    ),
    #(
      "diameter_of_binary_tree(Leaf)",
      string.inspect(0),
      string.inspect(solution.diameter_of_binary_tree(Leaf)),
    ),
    #(
      "diameter_of_binary_tree(a single node)",
      string.inspect(0),
      string.inspect(solution.diameter_of_binary_tree(bud(1))),
    ),
    #(
      "diameter_of_binary_tree(one child)",
      string.inspect(1),
      string.inspect(solution.diameter_of_binary_tree(Node(1, bud(2), Leaf))),
    ),
    #(
      "diameter_of_binary_tree(widest path misses the root)",
      string.inspect(4),
      string.inspect(
        solution.diameter_of_binary_tree(Node(
          1,
          Node(2, Node(4, bud(6), Leaf), Node(5, Leaf, bud(7))),
          Leaf,
        )),
      ),
    ),
  ]
}
