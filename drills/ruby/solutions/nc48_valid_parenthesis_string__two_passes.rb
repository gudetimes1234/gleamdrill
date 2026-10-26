def check_valid_string(s)
  # Two one-sided checks. Left to right with every star an opener asks whether
  # there are ever too many closers; right to left with every star a closer
  # asks whether there are ever too many openers. Passing both is exactly the
  # condition, and each pass is the ordinary balance check.
  never_negative(s, "(") && never_negative(s.reverse, ")")
end

def never_negative(s, credit)
  balance = 0
  s.each_char do |c|
    balance += c == credit || c == "*" ? 1 : -1
    return false if balance < 0
  end
  true
end
