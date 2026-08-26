def countSubstrings(s):
    # Same 2n centres as finding the longest one, except that here every
    # successful widening is itself an answer, so the count is how many times
    # the expansion succeeded rather than how far it got.
    total = 0
    for i in range(len(s)):
        total += grow(s, i, i) + grow(s, i, i + 1)
    return total


def grow(s, left, right):
    count = 0
    while left >= 0 and right < len(s) and s[left] == s[right]:
        count += 1
        left -= 1
        right += 1
    return count
