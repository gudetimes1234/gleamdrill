def clone_graph(node)
  return nil if node.nil?

  # The map from original node to its copy is the whole problem. Breadth-first:
  # a node gets its copy the moment it is discovered, and the map is checked
  # before copying anything, so a node already in it is reused rather than
  # copied again. Without that check any cycle goes round forever.
  clones = { node => Node.new(node.val, []) }
  queue = [node]
  until queue.empty?
    current = queue.shift
    current.neighbors.each do |neighbour|
      unless clones.key?(neighbour)
        clones[neighbour] = Node.new(neighbour.val, [])
        queue << neighbour
      end
      clones[current].neighbors << clones[neighbour]
    end
  end
  clones[node]
end
