import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "right_side_view(the 1/2/3 tree)",
      string.inspect([1, 3, 4]),
      string.inspect(
        solution.right_side_view(Node(
          1,
          Node(2, Leaf, bud(5)),
          Node(3, Leaf, bud(4)),
        )),
      ),
    ),
    #(
      "right_side_view(Leaf)",
      string.inspect([]),
      string.inspect(solution.right_side_view(Leaf)),
    ),
    #(
      "right_side_view(a single node)",
      string.inspect([1]),
      string.inspect(solution.right_side_view(bud(1))),
    ),
    #(
      "right_side_view(the right side runs out)",
      string.inspect([1, 3, 4]),
      string.inspect(
        solution.right_side_view(Node(1, Node(2, bud(4), Leaf), bud(3))),
      ),
    ),
  ]
}
