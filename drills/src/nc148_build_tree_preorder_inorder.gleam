pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list

// Pre-order names the root; in-order says how much of the rest belongs to each
// side. Neither traversal alone determines a tree, and this is why together
// they do — the split point found in the in-order list is exactly the size of
// the left subtree, which is what carves up the pre-order list too.
pub fn build_tree(preorder: List(Int), inorder: List(Int)) -> Tree {
  case preorder, inorder {
    [], _ -> Leaf
    [root, ..rest], _ -> {
      let left_size = index_of(inorder, root, 0)
      let #(left_pre, right_pre) = list.split(rest, left_size)
      let #(left_in, right_in) = list.split(inorder, left_size)
      Node(
        root,
        build_tree(left_pre, left_in),
        build_tree(right_pre, list.drop(right_in, 1)),
      )
    }
  }
}

fn index_of(values: List(Int), target: Int, at: Int) -> Int {
  case values {
    [] -> 0
    [head, ..rest] ->
      case head == target {
        True -> at
        False -> index_of(rest, target, at + 1)
      }
  }
}
