def level_order(root)
  # Walk depth-first and file each value under its depth. The traversal order
  # is wrong for the answer, but appending to the right bucket puts it right,
  # and within a level, left is still visited before right, which is all the
  # ordering the answer needs. One array of buckets instead of a frontier.
  levels = []
  collect(root, 0, levels)
  levels
end

def collect(node, depth, levels)
  return if node.nil?

  (levels[depth] ||= []) << node.val
  collect(node.left, depth + 1, levels)
  collect(node.right, depth + 1, levels)
end
