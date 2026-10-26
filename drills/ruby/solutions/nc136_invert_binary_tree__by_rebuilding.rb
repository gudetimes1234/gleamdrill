def invert_tree(root)
  # Write the tree out pre-order with a marker for every empty child, then
  # read it back taking the first subtree as the *right* child. The inversion
  # happens entirely in the reading: nothing is ever swapped. Longer than the
  # direct recursion, and worth having because the same flatten/rebuild pair
  # is all Serialize and Deserialize is.
  tokens = []
  flatten_tree(root, tokens)
  rebuild(tokens.each)
end

def flatten_tree(node, tokens)
  if node.nil?
    tokens << nil
    return
  end
  tokens << node.val
  flatten_tree(node.left, tokens)
  flatten_tree(node.right, tokens)
end

def rebuild(tokens)
  value = tokens.next
  return nil if value.nil?

  first = rebuild(tokens)
  second = rebuild(tokens)
  TreeNode.new(value, second, first)
end
