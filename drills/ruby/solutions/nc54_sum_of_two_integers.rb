MASK = 0xFFFFFFFF
LARGEST = 0x7FFFFFFF

def get_sum(a, b)
  # Addition without +. XOR is addition that forgets to carry; AND finds
  # exactly the places a carry was owed, and shifting it left one puts it
  # where it belongs. Repeat until nothing is owed.
  a &= MASK
  b &= MASK
  while b != 0
    carry = ((a & b) << 1) & MASK
    a = (a ^ b) & MASK
    b = carry
  end

  # Ruby integers grow without bound, so negatives have to be put back by
  # hand: a 32-bit pattern above the signed maximum is a negative number.
  a <= LARGEST ? a : ~(a ^ MASK)
end
