pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Walk both trees in step. Two empties match, an empty and a node never do, and
// two nodes match when their values do and both pairs of children do. Gleam's
// structural equality would answer this in one character — the point of writing
// it out is that the same shape is what Subtree and Symmetric Tree are built
// from.
pub fn is_same_tree(first: Tree, second: Tree) -> Bool {
  case first, second {
    Leaf, Leaf -> True
    Node(a, a_left, a_right), Node(b, b_left, b_right) ->
      a == b && is_same_tree(a_left, b_left) && is_same_tree(a_right, b_right)
    _, _ -> False
  }
}
