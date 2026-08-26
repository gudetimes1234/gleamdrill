pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Try to match at every node. The two questions are kept apart on purpose:
// "are these two trees identical" is the whole of the work, and "is it a
// subtree" is that question asked once per node. O(n*m) in the worst case, and
// a partial match that fails deep is what makes it so.
pub fn is_subtree(root: Tree, sub: Tree) -> Bool {
  case root, sub {
    _, Leaf -> True
    Leaf, _ -> False
    Node(_value, left, right), _ ->
      same(root, sub) || is_subtree(left, sub) || is_subtree(right, sub)
  }
}

fn same(first: Tree, second: Tree) -> Bool {
  case first, second {
    Leaf, Leaf -> True
    Node(a, a_left, a_right), Node(b, b_left, b_right) ->
      a == b && same(a_left, b_left) && same(a_right, b_right)
    _, _ -> False
  }
}
