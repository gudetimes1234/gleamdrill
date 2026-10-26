def max_depth(root)
  # Count the levels instead of measuring the branches: take the whole
  # frontier, replace it with all its children, and add one. No recursion and
  # no stack, which is what makes this the version that survives a tree deep
  # enough to overflow one.
  depth = 0
  frontier = [root].compact
  until frontier.empty?
    depth += 1
    frontier = frontier.flat_map { |node| [node.left, node.right] }.compact
  end
  depth
end
