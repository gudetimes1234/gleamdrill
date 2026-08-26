pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list
import gleam/option.{type Option, None, Some}

// Write the tree out pre-order with a marker for every empty child, then read
// it back taking the first subtree as the *right* child. The inversion happens
// entirely in the reading — nothing is ever swapped. Slower and longer than the
// direct recursion, and worth having because the same flatten/rebuild pair is
// all Serialize and Deserialize is.
pub fn invert_tree(tree: Tree) -> Tree {
  let #(inverted, _rest) = rebuild(flatten(tree))
  inverted
}

fn flatten(tree: Tree) -> List(Option(Int)) {
  case tree {
    Leaf -> [None]
    Node(value, left, right) -> [
      Some(value),
      ..list.append(flatten(left), flatten(right))
    ]
  }
}

fn rebuild(tokens: List(Option(Int))) -> #(Tree, List(Option(Int))) {
  case tokens {
    [Some(value), ..rest] -> {
      let #(first, after_first) = rebuild(rest)
      let #(second, after_second) = rebuild(after_first)
      #(Node(value, second, first), after_second)
    }
    [None, ..rest] -> #(Leaf, rest)
    [] -> #(Leaf, [])
  }
}
