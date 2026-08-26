pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Swap the children, then invert each of them. The swap and the recursion are
// the same line, which is why this is the shortest tree problem there is —
// and why the order does not matter: swapping before or after recursing gives
// the same tree.
pub fn invert_tree(tree: Tree) -> Tree {
  case tree {
    Leaf -> Leaf
    Node(value, left, right) ->
      Node(value, invert_tree(right), invert_tree(left))
  }
}
