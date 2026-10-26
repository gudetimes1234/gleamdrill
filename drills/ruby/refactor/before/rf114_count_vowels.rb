def vowel_count(text)
  text.downcase.chars.select { |char| "aeiou".include?(char) }.length
end
