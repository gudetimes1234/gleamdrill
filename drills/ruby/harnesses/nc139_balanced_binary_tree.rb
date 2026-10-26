need :is_balanced

# LeetCode's level-order form: an array of values with nil for a missing
# child, trailing nils trimmed.
def tree_from(values)
  return nil if values.empty? || values[0].nil?

  root = TreeNode.new(values[0])
  queue = [root]
  head = 0
  i = 1
  while head < queue.length && i < values.length
    node = queue[head]
    head += 1
    if i < values.length
      value = values[i]
      i += 1
      unless value.nil?
        node.left = TreeNode.new(value)
        queue << node.left
      end
    end
    if i < values.length
      value = values[i]
      i += 1
      unless value.nil?
        node.right = TreeNode.new(value)
        queue << node.right
      end
    end
  end
  root
end

def tree_values(node)
  out = []
  queue = [node]
  head = 0
  while head < queue.length && out.length < 500
    current = queue[head]
    head += 1
    if current.nil?
      out << nil
    else
      out << current.val
      queue << current.left
      queue << current.right
    end
  end
  out.pop while !out.empty? && out[-1].nil?
  out
end

tc "is_balanced([3, 9, 20, nil, nil, 15, 7])", true, is_balanced(tree_from([3, 9, 20, nil, nil, 15, 7]))
tc "is_balanced([])", true, is_balanced(tree_from([]))
tc "is_balanced([1])", true, is_balanced(tree_from([1]))
tc "is_balanced([1, 2, 2, 3, 3, nil, nil, 4, 4])", false, is_balanced(tree_from([1, 2, 2, 3, 3, nil, nil, 4, 4]))
tc "is_balanced(balanced at the root, not below)", false, is_balanced(tree_from([1, 2, 2, 3, nil, nil, nil, 4]))
