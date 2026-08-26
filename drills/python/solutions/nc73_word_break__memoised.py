def wordBreak(s, wordDict):
    words = set(wordDict)
    memo = {}

    # Top-down: from this position, does any dictionary word start here and
    # leave a suffix that also breaks? Without the cache the same suffix is
    # asked about once per way of reaching it, which is where the exponential
    # blow-up on inputs like "aaaa...b" comes from.
    def breaks(start):
        if start >= len(s):
            return True
        if start not in memo:
            memo[start] = any(
                s[start:end] in words and breaks(end)
                for end in range(start + 1, len(s) + 1)
            )
        return memo[start]

    return breaks(0)
