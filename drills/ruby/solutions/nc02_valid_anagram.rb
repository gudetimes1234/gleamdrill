def is_anagram(s, t)
  return false if s.length != t.length

  counts = Hash.new(0)
  s.each_char { |c| counts[c] += 1 }
  t.each_char { |c| counts[c] -= 1 }
  counts.each_value.all?(&:zero?)
end
