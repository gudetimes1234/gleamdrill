require "set"

def swim_in_water(grid)
  return 0 if grid.empty?

  n = grid.length
  target = [n - 1, n - 1]

  reaches = lambda do |limit|
    # The target has to be passable itself, so its depth is checked before
    # it counts as reached.
    return false if grid[0][0] > limit

    seen = Set.new
    stack = [[0, 0]]
    until stack.empty?
      r, c = stack.pop
      next if seen.include?([r, c]) || grid[r][c] > limit
      return true if [r, c] == target

      seen << [r, c]
      [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].each do |nr, nc|
        stack << [nr, nc] if nr.between?(0, n - 1) && nc.between?(0, grid[nr].length - 1)
      end
    end
    false
  end

  # Reachability at time t is monotone: once the corner can be reached it
  # stays reachable as the water rises further. That is exactly the shape
  # binary search needs, so the question turns from "what is the cheapest
  # path" into "is it possible yet", answered by a plain flood fill.
  low = grid[0][0]
  high = n * n - 1
  while low < high
    middle = (low + high) / 2
    if reaches.call(middle)
      high = middle
    else
      low = middle + 1
    end
  end
  low
end
