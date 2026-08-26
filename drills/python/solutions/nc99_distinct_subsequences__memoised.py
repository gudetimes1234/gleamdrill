def numDistinct(s, t):
    memo = {}

    # The choice written out: when the characters match, either use this source
    # character for this target character or skip it; when they do not, skipping
    # is the only option. Running out of target is one complete subsequence,
    # which is why the base case is 1 rather than 0.
    def ways(i, j):
        if j >= len(t):
            return 1
        if i >= len(s):
            return 0
        if (i, j) not in memo:
            total = ways(i + 1, j)
            if s[i] == t[j]:
                total += ways(i + 1, j + 1)
            memo[(i, j)] = total
        return memo[(i, j)]

    return ways(0, 0)
