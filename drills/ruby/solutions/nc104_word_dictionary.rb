class WordDictionary
  attr_reader :children
  attr_accessor :terminal

  def initialize
    @children = {}
    @terminal = false
  end

  def add_word(word)
    node = self
    word.each_char { |letter| node = (node.children[letter] ||= WordDictionary.new) }
    node.terminal = true
  end

  # A dot has to try every child, which turns the lookup from a walk into a
  # search. The trie is what keeps that search from being over every word,
  # because a branch that cannot match is abandoned at the first letter.
  def search(word)
    return @terminal if word.empty?

    letter = word[0]
    rest = word[1..]
    return @children.each_value.any? { |child| child.search(rest) } if letter == "."

    @children.key?(letter) && @children[letter].search(rest)
  end
end
