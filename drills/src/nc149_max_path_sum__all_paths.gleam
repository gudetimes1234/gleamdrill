pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list

// Every path through every node, measured outright: for each node, take the
// best downward run on each side and add them. It recomputes those runs from
// scratch at every node, so it is O(n²) on a spindly tree — the cost of asking
// the two questions separately instead of returning both from one walk.
pub fn max_path_sum(tree: Tree) -> Int {
  case candidates(tree) {
    [] -> 0
    [first, ..rest] -> list.fold(rest, first, max)
  }
}

fn candidates(tree: Tree) -> List(Int) {
  case tree {
    Leaf -> []
    Node(value, left, right) -> [
      value + max(downwards(left), 0) + max(downwards(right), 0),
      ..list.append(candidates(left), candidates(right))
    ]
  }
}

fn downwards(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(value, left, right) ->
      value + max(max(downwards(left), downwards(right)), 0)
  }
}

fn max(a: Int, b: Int) -> Int {
  case a > b {
    True -> a
    False -> b
  }
}
