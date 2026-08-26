import gleam/string
import solution.{Leaf, Node}

fn bud(value: Int) -> solution.Tree {
  Node(value, Leaf, Leaf)
}

fn round_trip(tree: solution.Tree) -> solution.Tree {
  solution.deserialize(solution.serialize(tree))
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "deserialize(serialize(1/2/3-4-5)) -- the format is free, the round trip is not",
      string.inspect(Node(1, bud(2), Node(3, bud(4), bud(5)))),
      string.inspect(round_trip(Node(1, bud(2), Node(3, bud(4), bud(5))))),
    ),
    #(
      "deserialize(serialize(Leaf))",
      string.inspect(Leaf),
      string.inspect(round_trip(Leaf)),
    ),
    #(
      "deserialize(serialize(a single zero))",
      string.inspect(bud(0)),
      string.inspect(round_trip(bud(0))),
    ),
    #(
      "deserialize(serialize(a lopsided tree))",
      string.inspect(Node(1, Node(2, Node(3, Leaf, bud(4)), Leaf), Leaf)),
      string.inspect(
        round_trip(Node(1, Node(2, Node(3, Leaf, bud(4)), Leaf), Leaf)),
      ),
    ),
    #(
      "deserialize(serialize(negative values))",
      string.inspect(Node(-1, bud(-2), bud(-3))),
      string.inspect(round_trip(Node(-1, bud(-2), bud(-3)))),
    ),
  ]
}
