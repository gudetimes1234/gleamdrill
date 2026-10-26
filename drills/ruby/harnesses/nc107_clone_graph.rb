need :clone_graph

# Node i+1 has the neighbours adj[i] (1-based); nil for an empty list.
def graph(adj)
  return nil if adj.empty?

  nodes = adj.each_index.map { |i| Node.new(i + 1, []) }
  adj.each_with_index { |neighbours, i| neighbours.each { |n| nodes[i].neighbors << nodes[n - 1] } }
  nodes[0]
end

# Every node reachable from node, by identity.
def reachable(node)
  return [] if node.nil?

  seen = { node => true }
  queue = [node]
  until queue.empty?
    queue.shift.neighbors.each do |n|
      next if seen.key?(n)

      seen[n] = true
      queue << n
    end
  end
  seen.keys
end

# Row i holds the neighbour values of node i+1.
def adjacency(node)
  out = []
  reachable(node).each { |n| out[n.val - 1] = n.neighbors.map(&:val) }
  out
end

# A clone must have the original's shape and share none of its nodes.
def cloned(adj)
  original = graph(adj)
  copy = clone_graph(original)
  originals = reachable(original)
  return [[-1]] if reachable(copy).any? { |n| originals.any? { |o| o.equal?(n) } }

  adjacency(copy)
end

tc "clone_graph(the 4-cycle)", [[2, 4], [1, 3], [2, 4], [1, 3]], cloned([[2, 4], [1, 3], [2, 4], [1, 3]])
tc "clone_graph(two nodes)", [[2], [1]], cloned([[2], [1]])
tc "clone_graph(one node)", [[]], cloned([[]])
tc "clone_graph(nil)", [], cloned([])
