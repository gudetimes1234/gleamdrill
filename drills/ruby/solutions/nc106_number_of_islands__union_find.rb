require "set"

def num_islands(grid)
  land = Set.new
  grid.each_with_index do |row, r|
    row.each_with_index { |value, c| land << [r, c] if value == "1" }
  end

  # Union-find instead of flood fill: every square starts as its own island
  # and each adjacency merges two. Only right and down are needed (every
  # pair of neighbours is reached once that way) and the answer is how many
  # roots are left. This is the version that keeps working when the grid
  # arrives one square at a time and the count has to be reported after each.
  parents = land.to_h { |at| [at, at] }

  find = lambda do |at|
    while parents[at] != at
      parents[at] = parents[parents[at]]
      at = parents[at]
    end
    at
  end

  land.each do |r, c|
    [[r + 1, c], [r, c + 1]].each do |other|
      next unless land.include?(other)

      a = find.([r, c])
      b = find.(other)
      parents[a] = b if a != b
    end
  end

  land.map { |at| find.(at) }.uniq.length
end
