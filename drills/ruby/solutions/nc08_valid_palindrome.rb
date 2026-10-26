def is_palindrome(s)
  left = 0
  right = s.length - 1
  while left < right
    left += 1 while left < right && s[left] !~ /[[:alnum:]]/
    right -= 1 while left < right && s[right] !~ /[[:alnum:]]/
    return false if s[left].downcase != s[right].downcase

    left += 1
    right -= 1
  end
  true
end
