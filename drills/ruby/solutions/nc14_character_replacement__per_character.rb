def character_replacement(s, k)
  longest = 0

  ("A".."Z").each do |target|
    left = 0
    others = 0
    s.each_char.with_index do |char, right|
      others += 1 if char != target
      while others > k
        others -= 1 if s[left] != target
        left += 1
      end
      longest = [longest, right - left + 1].max
    end
  end
  longest
end
