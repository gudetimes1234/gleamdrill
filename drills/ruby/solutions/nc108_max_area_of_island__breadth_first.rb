require "set"

def max_area_of_island(grid)
  land = Set.new
  grid.each_with_index do |row, r|
    row.each_with_index { |value, c| land << [r, c] if value == 1 }
  end

  # Breadth-first instead. For a component's *size* the traversal order does
  # not matter at all (either visits every square exactly once) so the
  # choice is about the machine: a queue keeps the memory proportional to the
  # frontier rather than to the deepest path, which is what saves a long thin
  # island from overflowing the stack. Array#shift is cheap in Ruby, so a
  # plain array serves as the queue.
  seen = Set.new
  best = 0

  land.each do |at|
    next if seen.include?(at)

    area = 0
    frontier = [at]
    until frontier.empty?
      r, c = frontier.shift
      next if !land.include?([r, c]) || seen.include?([r, c])

      seen << [r, c]
      area += 1
      frontier.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1])
    end
    best = [best, area].max
  end

  best
end
