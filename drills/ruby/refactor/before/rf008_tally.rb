def letter_counts(word)
  counts = Hash.new(0)
  word.each_char do |char|
    counts[char] += 1
  end
  counts
end
