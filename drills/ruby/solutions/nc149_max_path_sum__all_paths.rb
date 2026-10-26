def max_path_sum(root)
  # Every path through every node, measured outright: for each node, take the
  # best downward run on each side and add them. It recomputes those runs from
  # scratch at every node, so it is O(n^2) on a spindly tree: the cost of
  # asking the two questions separately instead of returning both from one
  # walk.
  candidates(root).max || 0
end

def candidates(node)
  return [] if node.nil?

  through = node.val + [downwards(node.left), 0].max + [downwards(node.right), 0].max
  [through] + candidates(node.left) + candidates(node.right)
end

def downwards(node)
  return 0 if node.nil?

  node.val + [downwards(node.left), downwards(node.right), 0].max
end
