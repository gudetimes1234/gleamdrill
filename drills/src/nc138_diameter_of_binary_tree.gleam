pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// One walk, doing two jobs: each call returns its own height, and on the way
// past it records the path *through* that node — left height plus right height.
// The answer is the largest such path, so it is never returned, only tracked.
// That split between "what I return" and "what I record" is the pattern.
pub fn diameter_of_binary_tree(tree: Tree) -> Int {
  let #(_height, widest) = measure(tree)
  widest
}

fn measure(tree: Tree) -> #(Int, Int) {
  case tree {
    Leaf -> #(0, 0)
    Node(_value, left, right) -> {
      let #(left_height, left_widest) = measure(left)
      let #(right_height, right_widest) = measure(right)
      let through = left_height + right_height
      #(
        1 + max(left_height, right_height),
        max(through, max(left_widest, right_widest)),
      )
    }
  }
}

fn max(a: Int, b: Int) -> Int {
  case a > b {
    True -> a
    False -> b
  }
}
