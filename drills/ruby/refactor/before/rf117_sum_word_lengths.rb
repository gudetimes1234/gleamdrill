def total_letters(words)
  words.map { |word| word.length }.inject(0) { |acc, n| acc + n }
end
