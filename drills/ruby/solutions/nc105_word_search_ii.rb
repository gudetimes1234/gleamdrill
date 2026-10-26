require "set"

def find_words(board, words)
  return [] if board.empty? || board[0].empty?

  # One trie of all the words, walked *alongside* the board. Searching for
  # each word separately re-walks every shared prefix once per word; the trie
  # walks each prefix once and abandons a square the moment no word continues
  # that way, which is where nearly all the saving is.
  trie = {}
  words.each do |word|
    node = trie
    word.each_char { |letter| node = (node[letter] ||= {}) }
    node["$"] = word
  end

  found = Set.new

  walk = lambda do |r, c, node, used|
    return unless r.between?(0, board.length - 1) && c.between?(0, board[0].length - 1)
    return if used.include?([r, c]) || !node.key?(board[r][c])

    child = node[board[r][c]]
    found << child["$"] if child.key?("$")
    used |= [[r, c]]
    [[1, 0], [-1, 0], [0, 1], [0, -1]].each do |dr, dc|
      walk.(r + dr, c + dc, child, used)
    end
  end

  board.each_index do |r|
    board[0].each_index { |c| walk.(r, c, trie, Set.new) }
  end

  found.to_a
end
