require "set"

def oranges_rotting(grid)
  rotten = []
  fresh = 0

  grid.each_with_index do |row, r|
    row.each_with_index do |value, c|
      if value == 2
        rotten << [r, c]
      elsif value == 1
        fresh += 1
      end
    end
  end

  # Breadth-first from *every* rotten orange at once, which is what makes the
  # level count a time: all the sources start at minute zero together, so each
  # wave of the search is one minute. A separate search per source would give
  # distances from each, and then need combining.
  seen = Set.new(rotten)
  minutes = 0

  while !rotten.empty? && fresh.positive?
    following = []
    rotten.each do |r, c|
      [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].each do |nr, nc|
        next unless nr.between?(0, grid.length - 1) && nc.between?(0, grid[0].length - 1)
        next unless grid[nr][nc] == 1 && !seen.include?([nr, nc])

        seen << [nr, nc]
        fresh -= 1
        following << [nr, nc]
      end
    end
    break if following.empty?

    rotten = following
    minutes += 1
  end

  fresh.zero? ? minutes : -1
end
