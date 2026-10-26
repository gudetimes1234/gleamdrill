def long_words(words, min)
  words.select { |word| word.length >= min }
end
