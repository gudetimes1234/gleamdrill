pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

// Height and balance in one walk. A subtree reports its height, or reports that
// something below it is already unbalanced — and once that happens nothing
// above needs measuring at all. Using -1 as the "not balanced" height is what
// lets a single return value carry both answers.
pub fn is_balanced(tree: Tree) -> Bool {
  height(tree) >= 0
}

fn height(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    Node(_value, left, right) -> {
      let left_height = height(left)
      let right_height = height(right)
      case left_height < 0 || right_height < 0 {
        True -> -1
        False ->
          case abs(left_height - right_height) > 1 {
            True -> -1
            False -> 1 + max(left_height, right_height)
          }
      }
    }
  }
}

fn abs(n: Int) -> Int {
  case n < 0 {
    True -> -n
    False -> n
  }
}

fn max(a: Int, b: Int) -> Int {
  case a > b {
    True -> a
    False -> b
  }
}
