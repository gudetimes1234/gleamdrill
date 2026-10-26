def kth_smallest(root, k)
  # An in-order walk of a search tree visits the values in order, so the
  # answer is the kth thing it reaches. Stopping there is the point: the tree
  # below the kth value is never touched, which is what separates this from
  # sorting everything. The explicit stack is what makes stopping possible;
  # a recursive walk would have to run to the end.
  stack = []
  node = root
  while !stack.empty? || node
    while node
      stack << node
      node = node.left
    end
    node = stack.pop
    k -= 1
    return node.val if k.zero?

    node = node.right
  end
  -1
end
