def min_distance(word1, word2)
  memo = {}

  # The same three edits as an explicit choice from the front. Running out of
  # one word costs whatever is left of the other, since every remaining
  # character has to be inserted or deleted.
  cost = lambda do |i, j|
    return word2.length - j if i >= word1.length
    return word1.length - i if j >= word2.length

    memo[[i, j]] ||=
      if word1[i] == word2[j]
        cost.(i + 1, j + 1)
      else
        1 + [cost.(i + 1, j + 1), cost.(i + 1, j), cost.(i, j + 1)].min
      end
  end

  cost.(0, 0)
end
