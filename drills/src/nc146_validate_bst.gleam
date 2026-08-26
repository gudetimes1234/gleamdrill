pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Check against a range, not against the parent. A node can be larger than its
// own parent and still break the order, because the constraint comes from an
// ancestor further up — and that is the whole difficulty. Going left tightens
// the upper bound, going right the lower one.
pub fn is_valid_bst(tree: Tree) -> Bool {
  within(tree, None, None)
}

type Bound {
  None
  Limit(Int)
}

fn within(tree: Tree, low: Bound, high: Bound) -> Bool {
  case tree {
    Leaf -> True
    Node(value, left, right) ->
      above(value, low)
      && below(value, high)
      && within(left, low, Limit(value))
      && within(right, Limit(value), high)
  }
}

fn above(value: Int, low: Bound) -> Bool {
  case low {
    None -> True
    Limit(limit) -> value > limit
  }
}

fn below(value: Int, high: Bound) -> Bool {
  case high {
    None -> True
    Limit(limit) -> value < limit
  }
}
