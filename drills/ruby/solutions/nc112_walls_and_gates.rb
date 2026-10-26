def walls_and_gates(rooms)
  return rooms if rooms.empty? || rooms[0].empty?

  infinity = 2_147_483_647
  board = rooms.map(&:dup)
  rows = board.length
  columns = board[0].length

  # One breadth-first search starting from *all* the gates at once, rather
  # than one search per empty room. Because every source begins at distance
  # zero together, the first time a room is reached is by its nearest gate:
  # the multi-source search does the whole grid in one pass.
  frontier = []
  rows.times do |r|
    columns.times { |c| frontier << [r, c] if board[r][c].zero? }
  end

  until frontier.empty?
    r, c = frontier.shift
    [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].each do |nr, nc|
      next unless nr.between?(0, rows - 1) && nc.between?(0, columns - 1) && board[nr][nc] == infinity

      board[nr][nc] = board[r][c] + 1
      frontier << [nr, nc]
    end
  end

  board
end
