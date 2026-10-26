require "set"

def solve(board)
  return board if board.empty? || board[0].empty?

  rows = board.length
  columns = board[0].length

  # Invert the question. "Which regions are surrounded?" needs a search per
  # region and a rule for what counts as escaping; "which regions touch an
  # edge?" is one search from the border, and everything it does not reach is
  # surrounded by definition.
  safe = Set.new
  stack = []
  rows.times do |r|
    columns.times do |c|
      on_border = [0, rows - 1].include?(r) || [0, columns - 1].include?(c)
      stack << [r, c] if on_border && board[r][c] == "O"
    end
  end

  until stack.empty?
    r, c = stack.pop
    next unless r.between?(0, rows - 1) && c.between?(0, columns - 1)
    next if safe.include?([r, c]) || board[r][c] != "O"

    safe << [r, c]
    stack.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1])
  end

  board.each_with_index.map do |row, r|
    row.each_with_index.map { |value, c| value == "O" && !safe.include?([r, c]) ? "X" : value }
  end
end
