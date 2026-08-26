def longestPalindrome(s):
    # Every start with every length. O(n^3) once the palindrome check is counted
    # -- the definition, and what centre expansion is an optimisation of.
    best = ""
    for start in range(len(s)):
        for end in range(start + 1, len(s) + 1):
            candidate = s[start:end]
            if len(candidate) > len(best) and candidate == candidate[::-1]:
                best = candidate
    return best
