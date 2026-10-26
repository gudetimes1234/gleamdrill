def serialize(root)
  # Post-order instead of pre-order, still with a marker for every empty
  # child. The root is then the *last* token rather than the first, so the
  # reader works backwards, and reading backwards means taking the right
  # subtree before the left. Worth writing once: the format is what decides
  # the parse direction, and nothing else about the two versions differs.
  parts = []
  write_tokens(root, parts)
  parts.join(",")
end

def write_tokens(node, parts)
  if node.nil?
    parts << "#"
    return
  end
  write_tokens(node.left, parts)
  write_tokens(node.right, parts)
  parts << node.val.to_s
end

def deserialize(data)
  read_tokens(data.split(",").reverse_each)
end

def read_tokens(tokens)
  token = tokens.next
  return nil if token == "#"

  node = TreeNode.new(token.to_i)
  node.right = read_tokens(tokens)
  node.left = read_tokens(tokens)
  node
end
