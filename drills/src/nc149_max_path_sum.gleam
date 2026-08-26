pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Two different quantities, which is the whole trick. What a node *returns* is
// the best path that can continue upwards — so at most one of its children.
// What it *records* is the best path through it, which may use both. A
// negative branch is dropped rather than added, because a path is allowed to
// stop.
pub fn max_path_sum(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    _ -> {
      let #(_upwards, best) = walk(tree)
      best
    }
  }
}

fn walk(tree: Tree) -> #(Int, Int) {
  case tree {
    Leaf -> #(0, -1_000_000_000)
    Node(value, left, right) -> {
      let #(left_up, left_best) = walk(left)
      let #(right_up, right_best) = walk(right)
      let left_gain = max(left_up, 0)
      let right_gain = max(right_up, 0)
      #(
        value + max(left_gain, right_gain),
        max(value + left_gain + right_gain, max(left_best, right_best)),
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
