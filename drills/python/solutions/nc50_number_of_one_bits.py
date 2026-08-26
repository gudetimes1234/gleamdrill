def hammingWeight(n):
    # n & (n - 1) clears the lowest set bit and nothing else, so the loop runs
    # once per one bit rather than once per bit position.
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count
