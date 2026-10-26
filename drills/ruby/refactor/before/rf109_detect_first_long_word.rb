def first_long_word(words, min)
  i = 0
  result = nil
  while i < words.length
    if words[i].length >= min
      result = words[i]
      break
    end
    i += 1
  end
  result
end
