def countSubstrings(s):
    # Same 2n centres as finding the longest one, except that here every
    # successful widening is itself an answer, so the count is how many times
    # the expansion succeeded rather than how far it got.
    total = 0  # @1
    for i in range(len(s)):  # @2
        total += grow(s, i, i) + grow(s, i, i + 1)  # @3
    return total  # @4


def grow(s, left, right):
    count = 0  # @5
    while left >= 0 and right < len(s) and s[left] == s[right]:  # @6
        count += 1  # @7
        left -= 1  # @8
        right += 1  # @8
    return count  # @9
