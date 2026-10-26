def diameter_of_binary_tree(root)
  # One walk, doing two jobs: each call returns its own height, and on the way
  # past it records the path *through* that node, left height plus right
  # height. The answer is the largest such path, so it is never returned, only
  # tracked. That split between what a call returns and what it records is the
  # pattern worth keeping.
  measure(root)[1]
end

def measure(node)
  return [0, 0] if node.nil?

  left_height, left_widest = measure(node.left)
  right_height, right_widest = measure(node.right)
  [
    1 + [left_height, right_height].max,
    [left_height + right_height, left_widest, right_widest].max
  ]
end
