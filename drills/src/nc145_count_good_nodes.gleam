pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Carry the largest value seen on the way down. A node is good when nothing
// above it is bigger, so the check needs no knowledge of the tree below — which
// is what makes one pass enough. The root is always good, and passing its own
// value down as the initial maximum is what says so.
pub fn good_nodes(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(value, _left, _right) -> count(tree, value)
  }
}

fn count(tree: Tree, largest: Int) -> Int {
  case tree {
    Leaf -> 0
    Node(value, left, right) -> {
      let here = case value >= largest {
        True -> 1
        False -> 0
      }
      let largest = case value > largest {
        True -> value
        False -> largest
      }
      here + count(left, largest) + count(right, largest)
    }
  }
}
