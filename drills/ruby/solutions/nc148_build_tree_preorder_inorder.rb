def build_tree(preorder, inorder)
  # Pre-order names the root; in-order says how much of the rest belongs to
  # each side. Neither traversal alone determines a tree, and this is why
  # together they do: the split point found in the in-order list is exactly
  # the size of the left subtree, which is what carves up the pre-order list
  # too.
  return nil if preorder.empty?

  root = preorder[0]
  split = inorder.index(root)
  TreeNode.new(
    root,
    build_tree(preorder[1, split], inorder[0, split]),
    build_tree(preorder[(split + 1)..], inorder[(split + 1)..])
  )
end
