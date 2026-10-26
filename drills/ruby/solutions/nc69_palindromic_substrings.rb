def count_substrings(s)
  # Same 2n centres as finding the longest one, except that here every
  # successful widening is itself an answer, so the count is how many times
  # the expansion succeeded rather than how far it got.
  total = 0
  s.length.times do |i|
    total += grow(s, i, i) + grow(s, i, i + 1)
  end
  total
end

def grow(s, left, right)
  count = 0
  while left >= 0 && right < s.length && s[left] == s[right]
    count += 1
    left -= 1
    right += 1
  end
  count
end
