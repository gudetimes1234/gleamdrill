def is_happy(n)
  # The same question with no memory at all: run one pointer at single speed
  # and another at double, and they meet inside whatever cycle exists. Meeting
  # at 1 means the cycle is the fixed point; meeting anywhere else means it is
  # not. Constant space, which is the whole reason to know it.
  slow = n
  fast = square_digits(n)
  while slow != fast
    slow = square_digits(slow)
    fast = square_digits(square_digits(fast))
  end
  slow == 1
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
