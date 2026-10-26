def shout_tags(text)
  words = text.split(" ")
  words.map! do |word|
    if word.start_with?("#")
      word.upcase
    else
      word
    end
  end
  words.join(" ")
end
