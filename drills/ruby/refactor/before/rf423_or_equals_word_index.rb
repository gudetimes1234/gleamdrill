def index_by_letter(words)
  index = {}
  words.each do |word|
    letter = word[0]
    if !index.key?(letter)
      index[letter] = []
    end
    index[letter] << word
  end
  index
end
