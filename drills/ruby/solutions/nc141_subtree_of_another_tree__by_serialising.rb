def is_subtree(root, sub_root)
  # Serialise both trees and ask whether one string contains the other. That
  # turns an O(n*m) tree comparison into substring search, which is linear
  # with the right algorithm. It is only sound because the serialisation marks
  # the empty children: without them "2" inside "12" would match, and so would
  # a subtree that starts the same way but is missing a child.
  serialise(root).include?(serialise(sub_root))
end

def serialise(node)
  return "#" if node.nil?

  "(#{node.val}#{serialise(node.left)}#{serialise(node.right)})"
end
