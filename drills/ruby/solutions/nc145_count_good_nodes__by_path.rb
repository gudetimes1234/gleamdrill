def good_nodes(root)
  # Carry the whole path instead of just its maximum, and take the maximum at
  # each node. The same answer for O(depth) memory per node rather than one
  # integer: the version worth writing once, because it makes plain that the
  # running maximum is a fold of the path, not a separate idea.
  count_good(root, [])
end

def count_good(node, above)
  return 0 if node.nil?

  here = above.all? { |other| other <= node.val } ? 1 : 0
  below = above + [node.val]
  here + count_good(node.left, below) + count_good(node.right, below)
end
