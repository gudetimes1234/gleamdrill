require "set"

def walls_and_gates(rooms)
  return rooms if rooms.empty? || rooms[0].empty?

  infinity = 2_147_483_647
  rows = rooms.length
  columns = rooms[0].length

  # One search per empty room, looking for the nearest gate. The answer is the
  # same and the cost is not: every room re-explores the same corridors. Worth
  # writing once to see why starting from the gates instead (the sources, not
  # the questions) collapses all of it into a single pass.
  nearest = lambda do |start|
    seen = Set[start]
    frontier = [start]
    steps = 0
    until frontier.empty?
      following = []
      frontier.each do |r, c|
        return steps if rooms[r][c].zero?

        [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].each do |nr, nc|
          next unless nr.between?(0, rows - 1) && nc.between?(0, columns - 1)
          next unless rooms[nr][nc] != -1 && !seen.include?([nr, nc])

          seen << [nr, nc]
          following << [nr, nc]
        end
      end
      frontier = following
      steps += 1
    end
    infinity
  end

  rooms.each_with_index.map do |row, r|
    row.each_with_index.map { |value, c| value == infinity ? nearest.call([r, c]) : value }
  end
end
