def without_stop_words(text)
  stop_words = %w[a an the of]
  text.split.reject { |word| stop_words.include?(word) }.join(" ")
end
