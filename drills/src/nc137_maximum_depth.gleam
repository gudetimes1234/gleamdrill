pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// One more than the deeper of the two children, with an empty tree at zero.
// The whole problem is that base case: everything else is the definition of
// depth read aloud.
pub fn max_depth(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(_value, left, right) -> 1 + max(max_depth(left), max_depth(right))
  }
}

fn max(a: Int, b: Int) -> Int {
  case a > b {
    True -> a
    False -> b
  }
}
