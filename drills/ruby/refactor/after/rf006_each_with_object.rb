def word_lengths(words)
  words.each_with_object({}) { |word, lengths| lengths[word] = word.length }
end
