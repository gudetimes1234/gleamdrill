require "set"

def ladder_length(begin_word, end_word, word_list)
  words = word_list.to_set
  return 0 unless words.include?(end_word)

  # Neighbours found by comparing against every remaining word. Simpler to
  # state and O(n) comparisons per expansion rather than a constant number of
  # lookups, which is the cost the wildcard buckets remove.
  seen = Set[begin_word]
  frontier = [begin_word]
  steps = 1

  until frontier.empty?
    frontier.length.times do
      word = frontier.shift
      return steps if word == end_word

      words.each do |candidate|
        next if seen.include?(candidate)
        next unless differs_by_one?(word, candidate)

        seen << candidate
        frontier << candidate
      end
    end
    steps += 1
  end

  0
end

def differs_by_one?(a, b)
  a.length == b.length && a.chars.zip(b.chars).count { |x, y| x != y } == 1
end
