require "set"

def is_happy(n)
  # The sequence has to repeat eventually: squares of digits are bounded, so
  # there are only finitely many values it can reach. Remembering what has
  # been seen turns "does it loop?" into a set lookup.
  seen = Set.new
  while n != 1 && !seen.include?(n)
    seen << n
    n = square_digits(n)
  end
  n == 1
end

def square_digits(n)
  total = 0
  while n != 0
    digit = n % 10
    total += digit * digit
    n /= 10
  end
  total
end
