MASK = 0xFFFFFFFF
LARGEST = 0x7FFFFFFF


def getSum(a, b):
    # Addition without +. XOR is addition that forgets to carry; AND finds
    # exactly the places a carry was owed, and shifting it left one puts it
    # where it belongs. Repeat until nothing is owed.
    a &= MASK  # @1
    b &= MASK  # @2
    while b:  # @3
        carry = ((a & b) << 1) & MASK  # @4
        a = (a ^ b) & MASK  # @5
        b = carry  # @6

    # Python integers are arbitrary precision, so negatives have to be put back
    # by hand: a 32-bit pattern above the signed maximum is a negative number.
    return a if a <= LARGEST else ~(a ^ MASK)  # @7
