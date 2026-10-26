def adjacency(edges)
  graph = {}
  edges.each do |a, b|
    graph[a] = [] if graph[a].nil?
    graph[b] = [] if graph[b].nil?
    graph[a] << b
    graph[b] << a
  end
  graph
end
