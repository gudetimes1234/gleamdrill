require "set"

def length_of_longest_substring(s)
  window = Set.new
  left = 0
  longest = 0

  s.each_char.with_index do |char, right|
    while window.include?(char)
      window.delete(s[left])
      left += 1
    end
    window << char
    longest = [longest, right - left + 1].max
  end
  longest
end
