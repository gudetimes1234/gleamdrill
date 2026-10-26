require "set"

def ladder_length(begin_word, end_word, word_list)
  words = word_list.to_set
  return 0 unless words.include?(end_word)

  # The graph is never built: "hot" and "dot" are neighbours because they
  # share the pattern "*ot", so bucketing every word under each of its
  # wildcard patterns gives the adjacency for free. Comparing every pair
  # instead costs O(n^2) comparisons before the search even starts.
  buckets = Hash.new { |hash, pattern| hash[pattern] = [] }
  words.each do |word|
    word.length.times { |i| buckets["#{word[0, i]}*#{word[i + 1..]}"] << word }
  end

  seen = Set[begin_word]
  frontier = [begin_word]
  steps = 1

  until frontier.empty?
    frontier.length.times do
      word = frontier.shift
      return steps if word == end_word

      word.length.times do |i|
        buckets.fetch("#{word[0, i]}*#{word[i + 1..]}", []).each do |neighbour|
          next if seen.include?(neighbour)

          seen << neighbour
          frontier << neighbour
        end
      end
    end
    steps += 1
  end

  0
end
