def partition(s):
    n = len(s)  # @1

    # Work out which spans are palindromes once, up front, rather than
    # re-testing the same prefix on every branch of the search. The search is
    # then pure choice: a table lookup replaces a linear scan at every step.
    table = {}  # @2
    for span in range(n):  # @3
        for i in range(n - span):  # @4
            j = i + span  # @5
            inside = True if j - i < 2 else table[(i + 1, j - 1)]  # @6
            table[(i, j)] = s[i] == s[j] and inside  # @7

    def build(start):
        if start >= n:  # @8
            return [[]]  # @8
        return [  # @9
            [s[start:end + 1]] + rest  # @9
            for end in range(start, n)  # @10
            if table[(start, end)]  # @11
            for rest in build(end + 1)  # @12
        ]

    return build(0)  # @13
