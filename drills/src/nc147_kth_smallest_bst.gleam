pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// An in-order walk of a search tree visits the values in order, so the answer
// is the kth thing it reaches. Stopping there is the point: the tree below the
// kth value is never touched, which is what separates this from sorting
// everything.
pub fn kth_smallest(tree: Tree, k: Int) -> Int {
  case take(tree, k) {
    Found(value) -> value
    Remaining(_) -> -1
  }
}

type Progress {
  Found(Int)
  Remaining(Int)
}

fn take(tree: Tree, k: Int) -> Progress {
  case tree {
    Leaf -> Remaining(k)
    Node(value, left, right) ->
      case take(left, k) {
        Found(found) -> Found(found)
        Remaining(1) -> Found(value)
        Remaining(left_over) -> take(right, left_over - 1)
      }
  }
}
