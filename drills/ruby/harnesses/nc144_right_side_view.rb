need :right_side_view

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

tc "right_side_view([1, 2, 3, nil, 5, nil, 4])", [1, 3, 4], right_side_view(tree_from([1, 2, 3, nil, 5, nil, 4]))
tc "right_side_view([])", [], right_side_view(tree_from([]))
tc "right_side_view([1])", [1], right_side_view(tree_from([1]))
tc "right_side_view(the right side runs out)", [1, 3, 4], right_side_view(tree_from([1, 2, 3, 4]))
