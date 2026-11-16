def longestPalindrome(s):
    # Every palindrome has a centre, and there are only 2n of them -- n single
    # characters and n gaps between them. Growing outwards from each is O(n^2)
    # total and needs no table.
    best_start, best_length = 0, 0  # @1

    for i in range(len(s)):  # @2
        for left, right in ((i, i), (i, i + 1)):  # @3
            start, length = expand(s, left, right)  # @4
            if length > best_length:  # @5
                best_start, best_length = start, length  # @5

    return s[best_start:best_start + best_length]  # @6


# Widens while the ends match, then reports where it stopped as a start and a
# length. The two pointers have gone one step too far by then, which is where
# the +1 and the -1 come from.
def expand(s, left, right):
    while left >= 0 and right < len(s) and s[left] == s[right]:  # @7
        left -= 1  # @8
        right += 1  # @8
    return left + 1, right - left - 1  # @9
