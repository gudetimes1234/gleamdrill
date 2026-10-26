def build_tree(preorder, inorder)
  # The same construction without slicing anything: a map from value to its
  # in-order position, plus a low and a high bound saying which slice each
  # call owns. Building the map once turns the repeated search for the root,
  # the hidden O(n) inside the slicing version, into a lookup.
  places = inorder.each_with_index.to_h
  take(preorder.each, places, 0, inorder.length - 1)
end

def take(roots, places, low, high)
  return nil if low > high

  root = roots.next
  split = places[root]
  left = take(roots, places, low, split - 1)
  right = take(roots, places, split + 1, high)
  TreeNode.new(root, left, right)
end
