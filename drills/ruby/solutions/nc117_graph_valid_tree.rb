require "set"

def valid_tree(n, edges)
  # A graph with no nodes at all is vacuously a tree, provided it has no edges
  # either: worth stating, because the n-1 edge count says otherwise.
  return edges.empty? if n <= 0

  # A tree is two conditions at once: connected, and no cycles. Checking both
  # separately is unnecessary: with exactly n-1 edges, connected implies
  # acyclic and acyclic implies connected, so testing the edge count plus
  # either one is enough. Here it is the count plus reachability.
  return false if edges.length != n - 1

  adjacency = Array.new(n) { [] }
  edges.each do |a, b|
    adjacency[a] << b
    adjacency[b] << a
  end

  seen = Set.new
  stack = [0]
  until stack.empty?
    node = stack.pop
    next if seen.include?(node)

    seen << node
    stack.concat(adjacency[node])
  end

  seen.length == n
end
