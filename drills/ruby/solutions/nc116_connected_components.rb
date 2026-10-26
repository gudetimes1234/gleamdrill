def count_components(n, edges)
  # Start with n components and merge: every edge whose ends are not already
  # together removes one. No traversal, no adjacency list; the count falls
  # straight out of how many merges actually happened.
  parents = {}

  find = lambda do |node|
    node = parents[node] while parents.fetch(node, node) != node
    node
  end

  merges = 0
  edges.each do |a, b|
    root_a = find.call(a)
    root_b = find.call(b)
    next if root_a == root_b

    parents[root_a] = root_b
    merges += 1
  end

  n - merges
end
