require "set"

def pacific_atlantic(heights)
  return [] if heights.empty? || heights[0].empty?

  rows = heights.length
  columns = heights[0].length

  # The direct reading: from each square, flow downhill and see which edges
  # are reachable. Correct, and it repeats nearly all of its work: every
  # square on a shared downhill path re-explores the same route. Reversing the
  # question is what removes the repetition.
  downhill = lambda do |start|
    reached = Set.new
    frontier = [start]
    until frontier.empty?
      r, c = frontier.shift
      next if reached.include?([r, c])

      reached << [r, c]
      [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].each do |nr, nc|
        next unless nr.between?(0, rows - 1) && nc.between?(0, columns - 1)

        frontier << [nr, nc] if heights[nr][nc] <= heights[r][c]
      end
    end
    reached
  end

  out = []
  rows.times do |r|
    columns.times do |c|
      reached = downhill.([r, c])
      next unless reached.any? { |rr, cc| rr.zero? || cc.zero? }
      next unless reached.any? { |rr, cc| rr == rows - 1 || cc == columns - 1 }

      out << [r, c]
    end
  end

  out.sort
end
