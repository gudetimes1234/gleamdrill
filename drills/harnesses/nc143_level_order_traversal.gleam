import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "level_order(the 3/9/20 tree)",
      string.inspect([[3], [9, 20], [15, 7]]),
      string.inspect(
        solution.level_order(Node(3, bud(9), Node(20, bud(15), bud(7)))),
      ),
    ),
    #(
      "level_order(Leaf)",
      string.inspect([]),
      string.inspect(solution.level_order(Leaf)),
    ),
    #(
      "level_order(a single node)",
      string.inspect([[1]]),
      string.inspect(solution.level_order(bud(1))),
    ),
    #(
      "level_order(missing left children)",
      string.inspect([[1], [3], [4]]),
      string.inspect(solution.level_order(Node(1, Leaf, Node(3, Leaf, bud(4))))),
    ),
  ]
}
