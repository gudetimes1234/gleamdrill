require "set"

def pacific_atlantic(heights)
  return [] if heights.empty? || heights[0].empty?

  rows = heights.length
  columns = heights[0].length

  # Search *from* each ocean rather than from each cell. Asking "can this
  # square reach the sea?" means a fresh downhill search per square; asking
  # "which squares can the sea reach?" is two uphill searches in total, and
  # the answer is where they overlap.
  uphill = lambda do |starts|
    reached = Set.new
    frontier = starts.dup
    until frontier.empty?
      r, c = frontier.shift
      next if reached.include?([r, c])

      reached << [r, c]
      [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].each do |nr, nc|
        next unless nr.between?(0, rows - 1) && nc.between?(0, columns - 1)

        frontier << [nr, nc] if heights[nr][nc] >= heights[r][c]
      end
    end
    reached
  end

  pacific = (0...columns).map { |c| [0, c] } + (0...rows).map { |r| [r, 0] }
  atlantic = (0...columns).map { |c| [rows - 1, c] } + (0...rows).map { |r| [r, columns - 1] }

  (uphill.(pacific) & uphill.(atlantic)).sort
end
