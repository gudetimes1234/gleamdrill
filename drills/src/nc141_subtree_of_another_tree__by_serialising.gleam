pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/int
import gleam/string

// Serialise both trees and ask whether one string contains the other. That
// turns an O(n*m) tree comparison into substring search, which is linear with
// the right algorithm. It is only sound because the serialisation marks the
// empty children: without them "2" inside "12" would match, and so would a
// subtree that happens to start the same way but is missing a child.
pub fn is_subtree(root: Tree, sub: Tree) -> Bool {
  string.contains(serialise(root), serialise(sub))
}

fn serialise(tree: Tree) -> String {
  case tree {
    Leaf -> "#"
    Node(value, left, right) ->
      "(" <> int.to_string(value) <> serialise(left) <> serialise(right) <> ")"
  }
}
