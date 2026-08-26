def reverseBits(n):
    # Peel the bottom bit off the input and push it onto the bottom of the
    # result: the first bit out is the last bit in. Fixed at 32 rounds, because
    # the width is part of the problem rather than a property of the value.
    reversed_bits = 0
    for _ in range(32):
        reversed_bits = (reversed_bits << 1) | (n & 1)
        n >>= 1
    return reversed_bits
