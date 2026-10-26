def count_substrings(s)
  # The table says whether s[i..j] is a palindrome. It is when its ends match
  # and whatever is between them already was, so the spans have to be filled
  # shortest first, which is the whole reason for the outer loop over length.
  n = s.length
  table = {}
  total = 0

  n.times do |length|
    (0...n - length).each do |i|
      j = i + length
      inside = j - i < 2 ? true : table[[i + 1, j - 1]]
      table[[i, j]] = s[i] == s[j] && inside
      total += 1 if table[[i, j]]
    end
  end

  total
end
