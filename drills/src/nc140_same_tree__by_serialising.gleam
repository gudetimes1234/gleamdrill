pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/int

// Turn each tree into a string and compare those. It works only because the
// serialisation records the empty children too: without a marker for them,
// different trees can flatten to the same sequence, which is the same trap
// Serialize and Deserialize turns on.
pub fn is_same_tree(first: Tree, second: Tree) -> Bool {
  serialise(first) == serialise(second)
}

fn serialise(tree: Tree) -> String {
  case tree {
    Leaf -> "#"
    Node(value, left, right) ->
      "(" <> int.to_string(value) <> serialise(left) <> serialise(right) <> ")"
  }
}
