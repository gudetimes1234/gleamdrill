LARGEST = 2_147_483_647
SMALLEST = -2_147_483_648

def reverse(x)
  # Reversing the text cannot overflow here, so the range check is a plain
  # comparison at the end rather than a guard inside the loop, which is only
  # safe because the value is not held in 32 bits along the way.
  magnitude = x.abs.to_s.reverse.to_i
  result = x.negative? ? -magnitude : magnitude
  result > LARGEST || result < SMALLEST ? 0 : result
end
