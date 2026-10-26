require "set"

def exist(board, word)
  return true if word.empty?
  return false if board.empty?

  # Depth-first from every starting square, with the path so far held in a set
  # so a letter is never reused within one attempt. The set is per-path rather
  # than global: a square rejected on one route must still be available on
  # another, which is the difference between backtracking and plain search.
  # The bounds check comes first because a negative index wraps in Ruby.
  walk = lambda do |r, c, remaining, used|
    return true if remaining.empty?
    return false if used.include?([r, c]) || !r.between?(0, board.length - 1) || !c.between?(0, board[0].length - 1)
    return false if board[r][c] != remaining[0]
    return true if remaining.length == 1

    used |= [[r, c]]
    [[-1, 0], [1, 0], [0, -1], [0, 1]].any? { |dr, dc| walk.(r + dr, c + dc, remaining[1..], used) }
  end

  board.each_index.any? do |r|
    board[0].each_index.any? { |c| walk.(r, c, word, Set.new) }
  end
end
