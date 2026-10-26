def is_same_tree(p, q)
  # Turn each tree into a string and compare those. It works only because the
  # serialisation records the empty children too: without a marker for them,
  # different trees flatten to the same sequence, the same trap Serialize and
  # Deserialize turns on.
  serialise(p) == serialise(q)
end

def serialise(node)
  return "#" if node.nil?

  "(#{node.val}#{serialise(node.left)}#{serialise(node.right)})"
end
