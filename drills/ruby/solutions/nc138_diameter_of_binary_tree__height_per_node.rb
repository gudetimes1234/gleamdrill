def diameter_of_binary_tree(root)
  # Ask every node how tall its two sides are and keep the largest sum.
  # Correct and obvious, but height is recomputed from scratch at every node,
  # so a balanced tree costs O(n log n) and a spindly one O(n^2), which is
  # exactly what returning the height alongside the answer avoids.
  return 0 if root.nil?

  [
    height(root.left) + height(root.right),
    diameter_of_binary_tree(root.left),
    diameter_of_binary_tree(root.right)
  ].max
end

def height(node)
  node.nil? ? 0 : 1 + [height(node.left), height(node.right)].max
end
