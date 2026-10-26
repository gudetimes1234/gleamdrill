def is_balanced(root)
  # The definition read literally: every node's two sides differ by at most
  # one, and both sides are themselves balanced. It recomputes height at every
  # node, so the work is O(n^2) on a spindly tree: the price of separating
  # the two questions the single-pass version answers together.
  return true if root.nil?

  (height(root.left) - height(root.right)).abs <= 1 &&
    is_balanced(root.left) &&
    is_balanced(root.right)
end

def height(node)
  node.nil? ? 0 : 1 + [height(node.left), height(node.right)].max
end
