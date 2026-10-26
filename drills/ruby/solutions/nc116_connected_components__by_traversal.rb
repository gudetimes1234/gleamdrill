require "set"

def count_components(n, edges)
  adjacency = Array.new(n) { [] }
  edges.each do |a, b|
    adjacency[a] << b
    adjacency[b] << a
  end

  # One search per unvisited node, exactly as with islands on a grid: the
  # same counting-components idea with an adjacency list instead of
  # coordinates. Worth seeing side by side with union-find: this one needs the
  # whole graph up front, the other can take edges as they arrive.
  seen = Set.new
  count = 0

  n.times do |node|
    next if seen.include?(node)

    count += 1
    stack = [node]
    until stack.empty?
      current = stack.pop
      next if seen.include?(current)

      seen << current
      stack.concat(adjacency[current])
    end
  end

  count
end
