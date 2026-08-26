pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list

// Find the path from the root to each target, then take the last node they
// share. It ignores the ordering entirely, which is why it is the version that
// also works on a plain binary tree — at the cost of two searches and two
// stored paths rather than one walk and nothing.
pub fn lowest_common_ancestor(tree: Tree, p: Int, q: Int) -> Int {
  let to_p = path(tree, p, [])
  let to_q = path(tree, q, [])
  last_shared(list.reverse(to_p), list.reverse(to_q), -1)
}

fn path(tree: Tree, target: Int, seen: List(Int)) -> List(Int) {
  case tree {
    Leaf -> []
    Node(value, left, right) ->
      case value == target {
        True -> [value, ..seen]
        False ->
          case path(left, target, [value, ..seen]) {
            [] -> path(right, target, [value, ..seen])
            found -> found
          }
      }
  }
}

fn last_shared(first: List(Int), second: List(Int), best: Int) -> Int {
  case first, second {
    [a, ..a_rest], [b, ..b_rest] ->
      case a == b {
        True -> last_shared(a_rest, b_rest, a)
        False -> best
      }
    _, _ -> best
  }
}
