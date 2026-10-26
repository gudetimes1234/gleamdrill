def longest_common_subsequence(text1, text2)
  # Compare the last characters: equal means both are used and the answer is
  # one more than the rest, different means the best of dropping one or the
  # other. Filled row by row, only the previous row is ever needed.
  previous = Array.new(text2.length + 1, 0)

  text1.each_char do |a|
    row = Array.new(text2.length + 1, 0)
    text2.each_char.with_index(1) do |b, j|
      row[j] = a == b ? previous[j - 1] + 1 : [previous[j], row[j - 1]].max
    end
    previous = row
  end

  previous[-1]
end
