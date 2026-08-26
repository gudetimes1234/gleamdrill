pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// The ordering does all the work. If both targets are below the current value
// go left, if both are above go right, and otherwise this node is the split
// point — which is the answer. No searching for either node first, and no
// comparing of paths.
pub fn lowest_common_ancestor(tree: Tree, p: Int, q: Int) -> Int {
  case tree {
    Leaf -> -1
    Node(value, left, right) ->
      case p < value && q < value, p > value && q > value {
        True, _ -> lowest_common_ancestor(left, p, q)
        _, True -> lowest_common_ancestor(right, p, q)
        _, _ -> value
      }
  }
}
