def is_palindrome(s)
  cleaned = s.downcase.gsub(/[^[:alnum:]]/, "")
  cleaned == cleaned.reverse
end
