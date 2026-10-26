def check_inclusion(s1, s2)
  return false if s1.length > s2.length

  wanted = s1.chars.tally
  window = s2[0, s1.length].chars.tally
  return true if window == wanted

  (s1.length...s2.length).each do |i|
    window[s2[i]] = window.fetch(s2[i], 0) + 1
    left_char = s2[i - s1.length]
    window[left_char] -= 1
    # Drop zero counts, or the two hashes never compare equal.
    window.delete(left_char) if window[left_char].zero?
    return true if window == wanted
  end
  false
end
