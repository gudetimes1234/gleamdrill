def words_by_length(words)
  result = {}
  lengths = words.map { |word| word.length }.uniq
  lengths.each do |len|
    result[len] = words.select { |word| word.length == len }
  end
  result
end
