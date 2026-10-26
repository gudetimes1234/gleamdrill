def is_valid_bst(root)
  # Check against a range, not against the parent. A node can be larger than
  # its own parent and still break the order, because the constraint comes
  # from an ancestor further up, and that is the whole difficulty. Going
  # left tightens the upper bound, going right the lower one.
  within(root, nil, nil)
end

def within(node, low, high)
  return true if node.nil?
  return false if low && node.val <= low
  return false if high && node.val >= high

  within(node.left, low, node.val) && within(node.right, node.val, high)
end
