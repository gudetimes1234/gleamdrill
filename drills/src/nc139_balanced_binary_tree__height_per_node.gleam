pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// The definition read literally: every node's two sides differ by at most one,
// and both sides are themselves balanced. It recomputes height at every node,
// so the work is O(n²) on a spindly tree — the price of separating the two
// questions the single-pass version answers together.
pub fn is_balanced(tree: Tree) -> Bool {
  case tree {
    Leaf -> True
    Node(_value, left, right) ->
      abs(height(left) - height(right)) <= 1
      && is_balanced(left)
      && is_balanced(right)
  }
}

fn height(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(_value, left, right) -> 1 + max(height(left), height(right))
  }
}

fn abs(n: Int) -> Int {
  case n < 0 {
    True -> -n
    False -> n
  }
}

fn max(a: Int, b: Int) -> Int {
  case a > b {
    True -> a
    False -> b
  }
}
