def min_window(s, t)
  return "" if s.empty? || t.empty?

  wanted = t.chars.tally

  # Only the positions that could possibly matter. For a long haystack and a
  # short needle this is a far shorter walk than the whole string.
  positions = s.each_char.with_index.filter_map { |c, i| [i, c] if wanted.key?(c) }

  window = Hash.new(0)
  satisfied = 0
  left = 0
  best_start = 0
  best_length = 0

  positions.each do |index, c|
    window[c] += 1
    satisfied += 1 if window[c] == wanted[c]

    while satisfied == wanted.size
      start = positions[left][0]
      length = index - start + 1
      if best_length.zero? || length < best_length
        best_start = start
        best_length = length
      end
      leaving = positions[left][1]
      window[leaving] -= 1
      satisfied -= 1 if window[leaving] < wanted[leaving]
      left += 1
    end
  end
  s[best_start, best_length]
end
