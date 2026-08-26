def longestCommonSubsequence(text1, text2):
    memo = {}

    # The same recurrence from the front, with a cache. Written this way the
    # choice is explicit -- match and advance both, or give up one character
    # from one side -- which the rolling row hides behind its indices.
    def best(i, j):
        if i >= len(text1) or j >= len(text2):
            return 0
        if (i, j) not in memo:
            if text1[i] == text2[j]:
                memo[(i, j)] = best(i + 1, j + 1) + 1
            else:
                memo[(i, j)] = max(best(i + 1, j), best(i, j + 1))
        return memo[(i, j)]

    return best(0, 0)
