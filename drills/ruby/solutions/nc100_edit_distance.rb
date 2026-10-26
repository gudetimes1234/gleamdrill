def min_distance(word1, word2)
  # Three edits, three neighbours in the table: replace comes from the
  # diagonal, delete from above, insert from the left. Equal characters cost
  # nothing and take the diagonal outright; the whole algorithm is those
  # four lines. The first row and column are the cost of building a string
  # from nothing, which is its length.
  previous = (0..word2.length).to_a

  word1.each_char.with_index(1) do |a, i|
    row = [i] + [0] * word2.length
    word2.each_char.with_index(1) do |b, j|
      row[j] = a == b ? previous[j - 1] : 1 + [previous[j - 1], previous[j], row[j - 1]].min
    end
    previous = row
  end

  previous[word2.length]
end
