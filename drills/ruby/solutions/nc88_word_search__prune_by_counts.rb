require "set"

def exist(board, word)
  return true if word.empty?
  return false if board.empty?

  letters = board.flatten.tally
  needed = word.chars.tally

  # Two cheap checks before any searching. If the board does not hold enough
  # copies of some letter, no search can succeed. And searching from whichever
  # end of the word is rarer on the board starts from fewer squares: the
  # branching factor at the root is what dominates.
  return false if needed.any? { |letter, count| letters.fetch(letter, 0) < count }

  word = word.reverse if letters.fetch(word[0], 0) > letters.fetch(word[-1], 0)

  walk = lambda do |r, c, remaining, used|
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
