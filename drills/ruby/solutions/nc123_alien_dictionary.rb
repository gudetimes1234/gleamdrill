require "set"

def alien_order(words)
  letters = words.flat_map(&:chars).to_set

  # Two adjacent words agree up to their first difference, and that difference
  # is the only thing they say about the alphabet: everything after it is
  # unordered. The one case with no letters to compare is a word followed by a
  # prefix of itself, which no alphabet can explain.
  waiting = letters.to_h { |letter| [letter, 0] }
  unlocks = letters.to_h { |letter| [letter, []] }
  words.each_cons(2) do |first, second|
    at = (0...[first.length, second.length].min).find { |i| first[i] != second[i] }
    if at
      unlocks[first[at]] << second[at]
      waiting[second[at]] += 1
    elsif first.length > second.length
      return ""
    end
  end

  ready = letters.select { |letter| waiting[letter].zero? }
  order = []
  until ready.empty?
    letter = ready.pop
    order << letter
    unlocks[letter].each do |following|
      waiting[following] -= 1
      ready << following if waiting[following].zero?
    end
  end

  # Short means the leftovers all depend on each other: the ordering the words
  # describe is contradictory, so no alphabet satisfies it.
  order.length == letters.length ? order.join : ""
end
