require "set"

def find_words(board, words)
  return [] if board.empty? || board[0].empty?

  # Word Search, once per word. Correct, and it redoes the search for every
  # shared prefix: a hundred words beginning "ab" each re-walk that "ab" from
  # every square. That repetition is exactly what the trie removes.
  exists = lambda do |word|
    walk = lambda do |r, c, at, used|
      return false unless r.between?(0, board.length - 1) && c.between?(0, board[0].length - 1)
      return false if used.include?([r, c]) || board[r][c] != word[at]
      return true if at == word.length - 1

      used |= [[r, c]]
      [[1, 0], [-1, 0], [0, 1], [0, -1]].any? do |dr, dc|
        walk.(r + dr, c + dc, at + 1, used)
      end
    end

    !word.empty? && board.each_index.any? do |r|
      board[0].each_index.any? { |c| walk.(r, c, 0, Set.new) }
    end
  end

  words.select { |word| exists.(word) }
end
