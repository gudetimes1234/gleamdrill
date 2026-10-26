def is_subtree(root, sub_root)
  # Try to match at every node. The two questions are kept apart on purpose:
  # "are these two trees identical" is the whole of the work, and "is it a
  # subtree" is that question asked once per node. O(n*m) in the worst case,
  # and a partial match that fails deep is what makes it so.
  return true if sub_root.nil?
  return false if root.nil?

  same(root, sub_root) || is_subtree(root.left, sub_root) || is_subtree(root.right, sub_root)
end

def same(a, b)
  return true if a.nil? && b.nil?
  return false if a.nil? || b.nil?

  a.val == b.val && same(a.left, b.left) && same(a.right, b.right)
end
