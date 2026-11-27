def reverseBits(n):
    # Peel the bottom bit off the input and push it onto the bottom of the
    # result: the first bit out is the last bit in. Fixed at 32 rounds, because
    # the width is part of the problem rather than a property of the value.
    reversed_bits = 0  # @1
    for _ in range(32):  # @2
        reversed_bits = (reversed_bits << 1) | (n & 1)  # @3
        n >>= 1  # @4
    return reversed_bits  # @5
