def max_depth(root)
  # One more than the deeper of the two children, with an empty tree at zero.
  # The whole problem is that base case: everything else is the definition of
  # depth read aloud.
  return 0 if root.nil?

  1 + [max_depth(root.left), max_depth(root.right)].max
end
