def numDistinct(s, t):
    # Row j counts the ways to build the first j characters of t out of the
    # source seen so far. A new source character can extend a count at j-1 into
    # one at j, but only if it matches t[j-1].
    #
    # The row must be swept right to left: left to right, an update at j-1 feeds
    # straight into j and the same source character gets used twice.
    row = [1] + [0] * len(t)

    for c in s:
        for j in range(len(t), 0, -1):
            if c == t[j - 1]:
                row[j] += row[j - 1]

    return row[len(t)]
