def length_of_longest_substring(s)
  longest = 0
  start = 0

  s.each_char.with_index do |char, right|
    # index finds the first copy at or after start; s[right] is char itself,
    # so anything earlier than right is a repeat inside the window.
    found = s.index(char, start)
    start = found + 1 if found < right
    longest = [longest, right - start + 1].max
  end
  longest
end
