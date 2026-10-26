require "set"

def max_area_of_island(grid)
  land = Set.new
  grid.each_with_index do |row, r|
    row.each_with_index { |value, c| land << [r, c] if value == 1 }
  end

  # The same component search as counting islands, except each search reports
  # how much it covered rather than just that it happened.
  seen = Set.new
  best = 0

  land.each do |at|
    next if seen.include?(at)

    area = 0
    stack = [at]
    until stack.empty?
      r, c = stack.pop
      next if !land.include?([r, c]) || seen.include?([r, c])

      seen << [r, c]
      area += 1
      stack.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1])
    end
    best = [best, area].max
  end

  best
end
