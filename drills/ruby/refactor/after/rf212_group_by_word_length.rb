def words_by_length(words)
  words.group_by(&:length)
end
