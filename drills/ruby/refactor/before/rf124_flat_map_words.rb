def words_in(lines)
  words = []
  lines.each do |line|
    words.concat(line.split)
  end
  words
end
