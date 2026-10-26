def index_by_letter(words)
  index = {}
  words.each do |word|
    (index[word[0]] ||= []) << word
  end
  index
end
