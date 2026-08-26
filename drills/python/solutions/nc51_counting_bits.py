def countBits(n):
    # Every number is some smaller number with one extra bit on the end:
    # count(i) is count(i >> 1) plus whatever that last bit is. Each answer
    # costs one lookup, so the whole array is O(n).
    counts = [0] * (n + 1)
    for i in range(1, n + 1):
        counts[i] = counts[i >> 1] + (i & 1)
    return counts
