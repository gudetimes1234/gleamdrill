pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list

// Carry the whole path instead of just its maximum, and take the maximum at
// each node. The same answer for O(depth) memory per node rather than one
// integer — the version worth writing once, because it makes plain that the
// running maximum is a fold of the path, not a separate idea.
pub fn good_nodes(tree: Tree) -> Int {
  count(tree, [])
}

fn count(tree: Tree, above: List(Int)) -> Int {
  case tree {
    Leaf -> 0
    Node(value, left, right) -> {
      let here = case list.all(above, fn(other) { other <= value }) {
        True -> 1
        False -> 0
      }
      here + count(left, [value, ..above]) + count(right, [value, ..above])
    }
  }
}
