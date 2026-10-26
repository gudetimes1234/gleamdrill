require "set"

def word_break(s, word_dict)
  words = word_dict.to_set

  # Reachable positions rather than a table of booleans: start at 0, and a
  # position is reachable when some word in the dictionary bridges the gap
  # from a position already reached.
  reached = Set[0]
  (1..s.length).each do |stop|
    reached << stop if (0...stop).any? { |start| reached.include?(start) && words.include?(s[start...stop]) }
  end

  reached.include?(s.length)
end
