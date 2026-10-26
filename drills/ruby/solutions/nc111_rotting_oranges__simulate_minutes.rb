def oranges_rotting(grid)
  board = grid.map(&:dup)
  minutes = 0

  # Rewrite the whole grid once per minute rather than tracking a frontier.
  # Much more work (every square is examined every minute, not just the ones
  # next to the rot) but it is the problem statement executed literally, and
  # it makes plain that the answer counts *rounds*, not distances.
  loop do
    following = board.each_with_index.map do |row, r|
      row.each_with_index.map do |value, c|
        touching = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].any? do |nr, nc|
          nr.between?(0, board.length - 1) && nc.between?(0, board[0].length - 1) && board[nr][nc] == 2
        end
        value == 1 && touching ? 2 : value
      end
    end
    if following == board
      # Nothing changed: either everything has rotted or what is left
      # never will.
      return board.any? { |row| row.include?(1) } ? -1 : minutes
    end

    board = following
    minutes += 1
  end
end
