def isMatch(s, p):
    memo = {}  # @1

    # A star binds to the character *before* it, so the pattern has to be read
    # two symbols at a time. Given "x*", either skip the pair entirely -- zero
    # copies -- or, if x matches here, consume one character of the text and
    # stay on the same pair. Everything else is a single-character match.
    def works(i, j):
        if j >= len(p):  # @2
            return i >= len(s)  # @2
        if (i, j) not in memo:  # @3
            here = i < len(s) and p[j] in (s[i], ".")  # @4
            if j + 1 < len(p) and p[j + 1] == "*":  # @5
                memo[(i, j)] = works(i, j + 2) or (here and works(i + 1, j))  # @6
            else:  # @7
                memo[(i, j)] = here and works(i + 1, j + 1)  # @7
        return memo[(i, j)]  # @8

    return works(0, 0)  # @9
