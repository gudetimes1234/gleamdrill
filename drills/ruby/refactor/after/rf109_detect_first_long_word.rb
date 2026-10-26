def first_long_word(words, min)
  words.find { |word| word.length >= min }
end
