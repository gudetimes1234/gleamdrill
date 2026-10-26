class WordDictionary
  def initialize
    # Words bucketed by length. A pattern can only match words of its own
    # length, so that one check throws away most of the collection before
    # any character is compared.
    @by_length = Hash.new { |hash, length| hash[length] = [] }
  end

  def add_word(word)
    @by_length[word.length] << word
  end

  # No shared prefixes, so every candidate of the right length is compared
  # position by position. Slower than the trie on a large dictionary, and it
  # needs no tree, which is the trade the trie is making.
  def search(word)
    @by_length.fetch(word.length, []).any? do |candidate|
      word.chars.zip(candidate.chars).all? { |p, c| p == "." || p == c }
    end
  end
end
