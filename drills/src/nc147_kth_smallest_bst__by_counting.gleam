pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Count the left subtree and decide which way to go — fewer than k on the left
// means the answer is this node or to its right. It descends one path instead
// of walking in order, and it is the version that adapts when the tree stores
// its own subtree sizes, which turns the whole thing into O(depth).
pub fn kth_smallest(tree: Tree, k: Int) -> Int {
  case tree {
    Leaf -> -1
    Node(value, left, right) -> {
      let on_the_left = size(left)
      case k <= on_the_left, k == on_the_left + 1 {
        True, _ -> kth_smallest(left, k)
        _, True -> value
        _, _ -> kth_smallest(right, k - on_the_left - 1)
      }
    }
  }
}

fn size(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(_value, left, right) -> 1 + size(left) + size(right)
  }
}
