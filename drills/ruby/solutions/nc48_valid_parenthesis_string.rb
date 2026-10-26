def check_valid_string(s)
  # Rather than guessing what each star should be, carry the *range* of open
  # counts still possible: low if every star so far were a closer, high if
  # every one were an opener. High going negative means even the most generous
  # reading has too many closers; low is clamped at zero because a star can
  # always be nothing.
  low = high = 0

  s.each_char do |c|
    case c
    when "("
      low += 1
      high += 1
    when ")"
      low = [low - 1, 0].max
      high -= 1
    else
      low = [low - 1, 0].max
      high += 1
    end
    return false if high < 0
  end

  low.zero?
end
