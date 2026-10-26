require "set"

def num_islands(grid)
  land = Set.new
  grid.each_with_index do |row, r|
    row.each_with_index { |value, c| land << [r, c] if value == "1" }
  end

  # Counting connected components: start a search at every piece of land not
  # already reached, and each search that has to be started is one more
  # island. Marking as you go is what stops a component being counted once per
  # square.
  seen = Set.new
  count = 0

  land.each do |at|
    next if seen.include?(at)

    count += 1
    stack = [at]
    until stack.empty?
      r, c = stack.pop
      next if !land.include?([r, c]) || seen.include?([r, c])

      seen << [r, c]
      stack.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1])
    end
  end

  count
end
