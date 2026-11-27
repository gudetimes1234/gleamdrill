def hammingWeight(n):
    # n & (n - 1) clears the lowest set bit and nothing else, so the loop runs
    # once per one bit rather than once per bit position.
    count = 0  # @1
    while n:  # @2
        n &= n - 1  # @3
        count += 1  # @4
    return count  # @5
