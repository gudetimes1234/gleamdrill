def lowest_common_ancestor(root, p, q)
  # The ordering does all the work. If both targets are below the current
  # value go left, if both are above go right, and otherwise this node is the
  # split point, which is the answer. No searching for either node first,
  # and no comparing of paths.
  node = root
  while node
    if p < node.val && q < node.val
      node = node.left
    elsif p > node.val && q > node.val
      node = node.right
    else
      return node.val
    end
  end
  -1
end
