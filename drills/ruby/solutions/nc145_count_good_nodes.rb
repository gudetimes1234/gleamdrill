def good_nodes(root)
  # Carry the largest value seen on the way down. A node is good when nothing
  # above it is bigger, so the check needs no knowledge of the tree below,
  # which is what makes one pass enough. The root is always good, and passing
  # its own value down as the initial maximum is what says so.
  return 0 if root.nil?

  count_good(root, root.val)
end

def count_good(node, largest)
  return 0 if node.nil?

  here = node.val >= largest ? 1 : 0
  largest = [largest, node.val].max
  here + count_good(node.left, largest) + count_good(node.right, largest)
end
