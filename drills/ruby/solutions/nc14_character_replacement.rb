def character_replacement(s, k)
  count = Hash.new(0)
  left = 0
  max_count = 0
  longest = 0

  s.each_char.with_index do |char, right|
    count[char] += 1
    max_count = [max_count, count[char]].max

    while (right - left + 1) - max_count > k
      count[s[left]] -= 1
      left += 1
    end

    longest = [longest, right - left + 1].max
  end
  longest
end
