def isMatch(s, p):
    memo = {}

    # A star binds to the character *before* it, so the pattern has to be read
    # two symbols at a time. Given "x*", either skip the pair entirely -- zero
    # copies -- or, if x matches here, consume one character of the text and
    # stay on the same pair. Everything else is a single-character match.
    def works(i, j):
        if j >= len(p):
            return i >= len(s)
        if (i, j) not in memo:
            here = i < len(s) and p[j] in (s[i], ".")
            if j + 1 < len(p) and p[j + 1] == "*":
                memo[(i, j)] = works(i, j + 2) or (here and works(i + 1, j))
            else:
                memo[(i, j)] = here and works(i + 1, j + 1)
        return memo[(i, j)]

    return works(0, 0)
