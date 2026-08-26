pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Ask every node how tall its two sides are and keep the largest sum. Correct
// and obvious, but height is recomputed from scratch at every node, so a
// balanced tree costs O(n log n) and a spindly one O(n²) — which is exactly
// what returning the height alongside the answer avoids.
pub fn diameter_of_binary_tree(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(_value, left, right) ->
      max(
        height(left) + height(right),
        max(diameter_of_binary_tree(left), diameter_of_binary_tree(right)),
      )
  }
}

fn height(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(_value, left, right) -> 1 + max(height(left), height(right))
  }
}

fn max(a: Int, b: Int) -> Int {
  case a > b {
    True -> a
    False -> b
  }
}
