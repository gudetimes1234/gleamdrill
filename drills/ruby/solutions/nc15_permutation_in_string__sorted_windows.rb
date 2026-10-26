def check_inclusion(s1, s2)
  return false if s1.length > s2.length

  needle = s1.chars.sort
  size = s1.length

  (0..s2.length - size).each do |start|
    return true if s2[start, size].chars.sort == needle
  end
  false
end
