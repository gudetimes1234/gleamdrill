def partition(s):
    n = len(s)

    # Work out which spans are palindromes once, up front, rather than
    # re-testing the same prefix on every branch of the search. The search is
    # then pure choice: a table lookup replaces a linear scan at every step.
    table = {}
    for span in range(n):
        for i in range(n - span):
            j = i + span
            inside = True if j - i < 2 else table[(i + 1, j - 1)]
            table[(i, j)] = s[i] == s[j] and inside

    def build(start):
        if start >= n:
            return [[]]
        return [
            [s[start:end + 1]] + rest
            for end in range(start, n)
            if table[(start, end)]
            for rest in build(end + 1)
        ]

    return build(0)
