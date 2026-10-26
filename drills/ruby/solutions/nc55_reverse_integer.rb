LARGEST = 2_147_483_647
SMALLEST = -2_147_483_648

def reverse(x)
  # Peel a digit off the bottom of the input and push it onto the bottom of
  # the result. The overflow test has to happen *before* the multiply, because
  # in a fixed-width language the multiply is where the value would be lost.
  sign = x.negative? ? -1 : 1
  remaining = x.abs
  result = 0

  while remaining != 0
    return 0 if result > LARGEST / 10

    result = result * 10 + remaining % 10
    remaining /= 10
  end

  result *= sign
  result > LARGEST || result < SMALLEST ? 0 : result
end
