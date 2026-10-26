def right_side_view(root)
  # Depth-first, visiting the right child first, and recording a value only
  # when its depth is met for the first time. No frontier at all: being first
  # to reach a depth is the same thing as being rightmost on it, given that
  # order of visiting.
  seen = []
  look(root, 0, seen)
  seen
end

def look(node, depth, seen)
  return if node.nil?

  seen << node.val if depth == seen.length
  look(node.right, depth + 1, seen)
  look(node.left, depth + 1, seen)
end
