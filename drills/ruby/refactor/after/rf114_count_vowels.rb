def vowel_count(text)
  text.downcase.chars.count { |char| "aeiou".include?(char) }
end
