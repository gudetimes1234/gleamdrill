def serialize(root)
  # Pre-order with a marker for every empty child. Recording the empties is
  # what makes the format unambiguous (a pre-order list of values alone
  # matches many different trees), and it is also what lets the reader work
  # without any length information: it stops as soon as it has consumed a
  # whole subtree.
  parts = []
  write_tokens(root, parts)
  parts.join(",")
end

def write_tokens(node, parts)
  if node.nil?
    parts << "#"
    return
  end
  parts << node.val.to_s
  write_tokens(node.left, parts)
  write_tokens(node.right, parts)
end

def deserialize(data)
  read_tokens(data.split(",").each)
end

def read_tokens(tokens)
  token = tokens.next
  return nil if token == "#"

  node = TreeNode.new(token.to_i)
  node.left = read_tokens(tokens)
  node.right = read_tokens(tokens)
  node
end
