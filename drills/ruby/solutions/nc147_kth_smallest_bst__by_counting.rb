def kth_smallest(root, k)
  # Count the left subtree and decide which way to go: fewer than k on the
  # left means the answer is this node or to its right. It descends one path
  # instead of walking in order, and it is the version that adapts when the
  # tree stores its own subtree sizes, which turns the whole thing into
  # O(depth).
  node = root
  while node
    on_the_left = size(node.left)
    if k <= on_the_left
      node = node.left
    elsif k == on_the_left + 1
      return node.val
    else
      k -= on_the_left + 1
      node = node.right
    end
  end
  -1
end

def size(node)
  node.nil? ? 0 : 1 + size(node.left) + size(node.right)
end
