require "set"

def find_redundant_connection(edges)
  # Try removing each edge, latest first, and keep the first removal that
  # leaves a tree. O(n^2) against union-find's near-linear, but it needs no
  # new structure, and it says the specification outright: the answer is the
  # last edge whose absence would make the graph a tree.
  nodes = edges.flatten.to_set

  edges.reverse_each do |candidate|
    remaining = edges.reject { |edge| edge == candidate }
    return candidate.dup if tree?(remaining, nodes)
  end

  []
end

def tree?(edges, nodes)
  return true if nodes.empty?
  return false if edges.length != nodes.length - 1

  adjacency = nodes.to_h { |node| [node, []] }
  edges.each do |a, b|
    adjacency[a] << b
    adjacency[b] << a
  end

  seen = Set.new
  stack = [nodes.first]
  until stack.empty?
    node = stack.pop
    next if seen.include?(node)

    seen << node
    stack.concat(adjacency[node])
  end

  seen.length == nodes.length
end
