def long_words(words, min)
  kept = []
  words.each do |word|
    if word.length >= min
      kept << word
    end
  end
  kept
end
