def longest_palindrome(s)
  # Every palindrome has a centre, and there are only 2n of them: n single
  # characters and n gaps between them. Growing outwards from each is O(n^2)
  # total and needs no table.
  best_start = 0
  best_length = 0

  s.length.times do |i|
    [[i, i], [i, i + 1]].each do |left, right|
      start, length = expand(s, left, right)
      if length > best_length
        best_start = start
        best_length = length
      end
    end
  end

  s[best_start, best_length]
end

# Widens while the ends match, then reports where it stopped as a start and a
# length. The two pointers have gone one step too far by then, which is where
# the +1 and the -1 come from.
def expand(s, left, right)
  while left >= 0 && right < s.length && s[left] == s[right]
    left -= 1
    right += 1
  end
  [left + 1, right - left - 1]
end
