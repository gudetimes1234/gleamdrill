need :serialize, :deserialize

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

def round_trip(values) = tree_values(deserialize(serialize(tree_from(values))))

tc "deserialize(serialize([1, 2, 3, nil, nil, 4, 5]))", [1, 2, 3, nil, nil, 4, 5], round_trip([1, 2, 3, nil, nil, 4, 5])
tc "deserialize(serialize([]))", [], round_trip([])
tc "deserialize(serialize([0]))", [0], round_trip([0])
tc "deserialize(serialize(a lopsided tree))", [1, 2, nil, 3, nil, nil, 4], round_trip([1, 2, nil, 3, nil, nil, 4])
tc "deserialize(serialize([-1, -2, -3])) -- negatives survive", [-1, -2, -3], round_trip([-1, -2, -3])
