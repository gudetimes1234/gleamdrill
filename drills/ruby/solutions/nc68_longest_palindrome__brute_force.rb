def longest_palindrome(s)
  # Every start with every length. O(n^3) once the palindrome check is counted:
  # the definition, and what centre expansion is an optimisation of.
  best = ""
  (0...s.length).each do |start|
    (start + 1..s.length).each do |finish|
      candidate = s[start...finish]
      best = candidate if candidate.length > best.length && candidate == candidate.reverse
    end
  end
  best
end
