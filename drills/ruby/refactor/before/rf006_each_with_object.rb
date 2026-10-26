def word_lengths(words)
  lengths = {}
  words.each do |word|
    lengths[word] = word.length
  end
  lengths
end
