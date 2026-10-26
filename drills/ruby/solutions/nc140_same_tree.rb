def is_same_tree(p, q)
  # Walk both trees in step. Two empties match, an empty and a node never do,
  # and two nodes match when their values do and both pairs of children do.
  # The same shape is what Subtree of Another Tree and Symmetric Tree are
  # built from, which is why it is worth writing out rather than comparing
  # serialisations.
  return true if p.nil? && q.nil?
  return false if p.nil? || q.nil?

  p.val == q.val && is_same_tree(p.left, q.left) && is_same_tree(p.right, q.right)
end
