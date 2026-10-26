def invert_tree(root)
  # Swap the children, then invert each of them. The swap and the recursion
  # are the same line, which is why this is the shortest tree problem there
  # is, and why the order does not matter: swapping before or after recursing
  # gives the same tree.
  return nil if root.nil?

  root.left, root.right = invert_tree(root.right), invert_tree(root.left)
  root
end
