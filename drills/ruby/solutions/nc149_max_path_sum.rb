def max_path_sum(root)
  # Two different quantities, which is the whole trick. What a node *returns*
  # is the best path that can continue upwards, so at most one of its
  # children. What it *records* is the best path through it, which may use
  # both. A negative branch is dropped rather than added, because a path is
  # allowed to stop.
  return 0 if root.nil?

  walk(root)[1]
end

def walk(node)
  return [0, -(10**9)] if node.nil?

  left_up, left_best = walk(node.left)
  right_up, right_best = walk(node.right)
  left_gain = [left_up, 0].max
  right_gain = [right_up, 0].max
  [
    node.val + [left_gain, right_gain].max,
    [node.val + left_gain + right_gain, left_best, right_best].max
  ]
end
