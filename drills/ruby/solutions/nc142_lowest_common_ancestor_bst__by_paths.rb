def lowest_common_ancestor(root, p, q)
  # Find the path from the root to each target, then take the last node they
  # share. It ignores the ordering entirely, which is why it is the version
  # that also works on a plain binary tree, at the cost of two searches and
  # two stored paths rather than one walk and nothing.
  to_p = path(root, p)
  to_q = path(root, q)
  best = -1
  to_p.zip(to_q).each do |a, b|
    break if a != b

    best = a
  end
  best
end

def path(node, target)
  return [] if node.nil?
  return [node.val] if node.val == target

  [node.left, node.right].each do |side|
    found = path(side, target)
    return [node.val] + found unless found.empty?
  end
  []
end
