def hammingWeight(n):
    # One step per bit position rather than per set bit: 32 iterations whatever
    # the input, but nothing to remember beyond "look at the bottom bit, shift".
    count = 0
    while n > 0:
        count += n & 1
        n >>= 1
    return count
