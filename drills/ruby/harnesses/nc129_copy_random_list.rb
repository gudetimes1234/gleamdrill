need :copy_random_list

# Builds a list from [value, random_index] pairs, where random_index is nil for
# no link.
def build(pairs)
  nodes = pairs.map { |value, _random| RandomNode.new(value) }
  nodes.each_with_index do |node, i|
    node.next = nodes[i + 1]
    node.random = pairs[i][1] && nodes[pairs[i][1]]
  end
  nodes.first
end

# Serialises back to [value, random_index] pairs, and checks along the way that
# every node is a *new* one: a copy that reuses the originals would otherwise
# pass every value comparison.
def serialise(head, originals)
  nodes = []
  node = head
  while node && nodes.length < 1000
    nodes << node
    node = node.next
  end
  places = nodes.each_with_index.to_h.compare_by_identity
  return "reused an original node" if nodes.any? { |n| originals.key?(n) }

  nodes.map { |n| [n.val, n.random && places[n.random]] }
end

def copied(pairs)
  head = build(pairs)
  originals = {}.compare_by_identity
  node = head
  while node
    originals[node] = true
    node = node.next
  end
  serialise(copy_random_list(head), originals)
end

tc "copy_random_list([[7, nil], [13, 0]])", [[7, nil], [13, 0]], copied([[7, nil], [13, 0]])
tc "copy_random_list([[1, 0]]) -- a node pointing at itself", [[1, 0]], copied([[1, 0]])
tc "copy_random_list(a forward link to a node not yet copied)", [[1, 2], [2, nil], [3, 0]], copied([[1, 2], [2, nil], [3, 0]])
tc "copy_random_list([])", [], copied([])
