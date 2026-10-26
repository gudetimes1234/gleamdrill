def is_valid_bst(root)
  # A binary search tree is exactly a tree whose in-order walk is strictly
  # increasing: that is the definition, restated so that no bounds have to
  # be threaded anywhere. The cost is the array: O(n) memory against the range
  # check's O(depth).
  values = []
  in_order(root, values)
  values.each_cons(2).all? { |a, b| a < b }
end

def in_order(node, values)
  return if node.nil?

  in_order(node.left, values)
  values << node.val
  in_order(node.right, values)
end
