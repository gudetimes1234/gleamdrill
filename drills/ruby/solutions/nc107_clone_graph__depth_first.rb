def clone_graph(node)
  return nil if node.nil?

  # Same map, depth-first instead of breadth-first. The copy is created and
  # registered *before* its neighbours are visited, which is the ordering that
  # makes a cycle find the half-built copy instead of recursing into it.
  clones = {}
  clone = lambda do |original|
    return clones[original] if clones.key?(original)

    copy = Node.new(original.val, [])
    clones[original] = copy
    original.neighbors.each { |neighbour| copy.neighbors << clone.(neighbour) }
    copy
  end
  clone.(node)
end
