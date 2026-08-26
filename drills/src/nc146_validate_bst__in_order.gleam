pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// A binary search tree is exactly a tree whose in-order walk is strictly
// increasing — that is the definition, restated so that no bounds have to be
// threaded anywhere. The cost is the list: O(n) memory against the range
// check's O(depth).
pub fn is_valid_bst(tree: Tree) -> Bool {
  increasing(in_order(tree, []))
}

fn in_order(tree: Tree, after: List(Int)) -> List(Int) {
  case tree {
    Leaf -> after
    Node(value, left, right) ->
      in_order(left, [value, ..in_order(right, after)])
  }
}

fn increasing(values: List(Int)) -> Bool {
  case values {
    [] | [_] -> True
    [first, second, ..rest] -> first < second && increasing([second, ..rest])
  }
}
