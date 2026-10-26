def valid_tree(n, edges)
  return edges.empty? if n <= 0

  # Both conditions from one pass. An edge joining two nodes already connected
  # is a cycle, so if none does, the graph is a forest, and a forest with
  # n-1 merges is a single tree. No adjacency list and no traversal.
  parents = {}

  find = lambda do |node|
    node = parents[node] while parents.fetch(node, node) != node
    node
  end

  merges = 0
  edges.each do |a, b|
    root_a = find.call(a)
    root_b = find.call(b)
    return false if root_a == root_b

    parents[root_a] = root_b
    merges += 1
  end

  merges == n - 1
end
