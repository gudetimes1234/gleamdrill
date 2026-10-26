require "set"

def solve(board)
  return board if board.empty? || board[0].empty?

  rows = board.length
  columns = board[0].length

  # The direct reading: find each region, then decide whether it escapes. It
  # works, and it needs a second idea the border search does not: the whole
  # region has to be collected before any verdict can be given, so the search
  # cannot stop early and the escape test is over the component rather than a
  # single square.
  seen = Set.new
  doomed = Set.new

  rows.times do |r|
    columns.times do |c|
      next if board[r][c] != "O" || seen.include?([r, c])

      region = Set.new
      stack = [[r, c]]
      until stack.empty?
        rr, cc = stack.pop
        next unless rr.between?(0, rows - 1) && cc.between?(0, columns - 1)
        next if region.include?([rr, cc]) || board[rr][cc] != "O"

        region << [rr, cc]
        stack.push([rr - 1, cc], [rr + 1, cc], [rr, cc - 1], [rr, cc + 1])
      end
      seen.merge(region)
      escapes = region.any? { |rr, cc| [0, rows - 1].include?(rr) || [0, columns - 1].include?(cc) }
      doomed.merge(region) unless escapes
    end
  end

  board.each_with_index.map do |row, r|
    row.each_with_index.map { |value, c| doomed.include?([r, c]) ? "X" : value }
  end
end
