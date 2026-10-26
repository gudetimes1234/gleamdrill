class Trie
  attr_reader :children
  attr_accessor :terminal

  def initialize
    # One node per prefix; `terminal` marks the prefixes that are whole
    # words. Without that flag "app" and "apple" are indistinguishable once
    # both are stored, which is the entire difference between search and
    # starts_with.
    @children = {}
    @terminal = false
  end

  def insert(word)
    node = self
    word.each_char { |letter| node = (node.children[letter] ||= Trie.new) }
    node.terminal = true
  end

  def search(word)
    node = walk(word)
    !node.nil? && node.terminal
  end

  def starts_with(prefix)
    !walk(prefix).nil?
  end

  def walk(letters)
    node = self
    letters.each_char do |letter|
      node = node.children[letter]
      return nil if node.nil?
    end
    node
  end
end
