def find_redundant_connection(edges)
  # n nodes and n edges means exactly one cycle. Union-find spots it the
  # moment an edge joins two nodes already connected, and because the edges
  # are processed in order, the first such edge is the last one that could be
  # removed, which is what the problem asks for.
  parents = {}

  find = lambda do |node|
    node = parents[node] while parents.fetch(node, node) != node
    node
  end

  found = nil
  edges.each do |a, b|
    root_a = find.call(a)
    root_b = find.call(b)
    if root_a == root_b
      found = [a, b]
    else
      parents[root_a] = root_b
    end
  end

  found || []
end
