def adjacency(edges)
  graph = Hash.new { |hash, node| hash[node] = [] }
  edges.each do |a, b|
    graph[a] << b
    graph[b] << a
  end
  graph
end
