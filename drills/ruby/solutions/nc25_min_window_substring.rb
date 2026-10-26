def min_window(s, t)
  return "" if s.empty? || t.empty?

  # Counts still owed by the window; extra copies drive an entry below zero.
  owed = t.chars.tally
  owed.default = 0

  missing = t.length
  left = 0
  best_start = 0
  best_length = 0

  s.each_char.with_index do |c, right|
    missing -= 1 if owed[c].positive?
    owed[c] -= 1

    while missing.zero?
      if best_length.zero? || right - left + 1 < best_length
        best_start = left
        best_length = right - left + 1
      end
      owed[s[left]] += 1
      missing += 1 if owed[s[left]].positive?
      left += 1
    end
  end
  s[best_start, best_length]
end
