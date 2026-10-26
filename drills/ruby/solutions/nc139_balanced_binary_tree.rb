def is_balanced(root)
  # Height and balance in one walk. A subtree reports its height, or reports
  # that something below it is already unbalanced, and once that happens
  # nothing above needs measuring at all. Using -1 as the "not balanced"
  # height is what lets a single return value carry both answers.
  measure(root) >= 0
end

def measure(node)
  return 0 if node.nil?

  left = measure(node.left)
  right = measure(node.right)
  return -1 if left < 0 || right < 0 || (left - right).abs > 1

  1 + [left, right].max
end
