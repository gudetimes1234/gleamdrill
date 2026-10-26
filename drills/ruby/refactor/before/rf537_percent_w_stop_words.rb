def without_stop_words(text)
  stop_words = ["a", "an", "the", "of"]
  text.split.reject { |word| stop_words.include?(word) }.join(" ")
end
