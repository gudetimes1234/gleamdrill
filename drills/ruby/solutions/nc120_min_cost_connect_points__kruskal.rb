def min_cost_connect_points(points)
  # Kruskal's algorithm: every edge, cheapest first, kept only when it joins
  # two pieces that are not already connected. Union-find is what makes that
  # test cheap. The trade against Prim's is the sort (O(n^2 log n) edges
  # here against Prim's O(n^2)) but Kruskal never needs the points
  # themselves, only the edge list, so it is the one that generalises to a
  # sparse graph.
  edges = []
  points.each_index do |i|
    (i + 1...points.length).each { |j| edges << [distance(points[i], points[j]), i, j] }
  end
  edges.sort!

  parents = {}

  find = lambda do |node|
    node = parents[node] while parents.fetch(node, node) != node
    node
  end

  total = 0
  edges.each do |cost, i, j|
    root_i = find.call(i)
    root_j = find.call(j)
    next if root_i == root_j

    parents[root_i] = root_j
    total += cost
  end

  total
end

def distance(a, b)
  (a[0] - b[0]).abs + (a[1] - b[1]).abs
end
