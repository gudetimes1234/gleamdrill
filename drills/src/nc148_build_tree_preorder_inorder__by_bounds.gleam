pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/dict
import gleam/list
import gleam/result

// The same construction without slicing anything: a map from value to its
// in-order position, plus a low and a high bound saying which slice each call
// owns. Building the map once turns the repeated search for the root — the
// hidden O(n) inside the slicing version — into a lookup.
pub fn build_tree(preorder: List(Int), inorder: List(Int)) -> Tree {
  let places =
    list.index_fold(inorder, dict.new(), fn(acc, value, i) {
      dict.insert(acc, value, i)
    })
  let #(tree, _rest) = take(preorder, places, 0, list.length(inorder) - 1)
  tree
}

fn take(
  preorder: List(Int),
  places: dict.Dict(Int, Int),
  low: Int,
  high: Int,
) -> #(Tree, List(Int)) {
  case low > high, preorder {
    True, _ -> #(Leaf, preorder)
    _, [] -> #(Leaf, [])
    _, [root, ..rest] -> {
      let split = result.unwrap(dict.get(places, root), low)
      let #(left, after_left) = take(rest, places, low, split - 1)
      let #(right, after_right) = take(after_left, places, split + 1, high)
      #(Node(root, left, right), after_right)
    }
  }
}
