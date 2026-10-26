require "set"

class Trie
  def initialize
    # Two sets: the whole words, and every prefix of every word. Both
    # questions then answer in one lookup, at the cost of storing O(total
    # letters) strings rather than sharing them, which is precisely the
    # memory a trie exists to save. The empty prefix is present from the
    # start: it is the root.
    @words = Set.new
    @prefixes = Set[""]
  end

  def insert(word)
    @words << word
    (0..word.length).each { |size| @prefixes << word[0, size] }
  end

  def search(word)
    @words.include?(word)
  end

  def starts_with(prefix)
    @prefixes.include?(prefix)
  end
end
