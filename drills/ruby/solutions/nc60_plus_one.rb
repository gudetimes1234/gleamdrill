def plus_one(digits)
  # Adding one is a carry that starts at 1 and dies as soon as a digit below
  # nine absorbs it. The only interesting case is when it never does, and the
  # number grows a digit.
  out = []
  carry = 1
  digits.reverse_each do |digit|
    total = digit + carry
    out << total % 10
    carry = total / 10
  end

  out << carry if carry.positive?
  out.reverse
end
