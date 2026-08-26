import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "build_tree([3,9,20,15,7], [9,3,15,20,7])",
      string.inspect(Node(3, bud(9), Node(20, bud(15), bud(7)))),
      string.inspect(solution.build_tree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])),
    ),
    #(
      "build_tree([], [])",
      string.inspect(Leaf),
      string.inspect(solution.build_tree([], [])),
    ),
    #(
      "build_tree([-1], [-1])",
      string.inspect(bud(-1)),
      string.inspect(solution.build_tree([-1], [-1])),
    ),
    #(
      "build_tree([1,2,3], [3,2,1]) -- leaning left",
      string.inspect(Node(1, Node(2, bud(3), Leaf), Leaf)),
      string.inspect(solution.build_tree([1, 2, 3], [3, 2, 1])),
    ),
    #(
      "build_tree([1,2,3], [1,2,3]) -- leaning right",
      string.inspect(Node(1, Leaf, Node(2, Leaf, bud(3)))),
      string.inspect(solution.build_tree([1, 2, 3], [1, 2, 3])),
    ),
  ]
}
