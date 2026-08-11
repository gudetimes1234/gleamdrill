def isAnagram(s, t):
    # Two words are anagrams exactly when their sorted letters match. One line,
    # O(n log n), and nothing to get wrong in the counting.
    return sorted(s) == sorted(t)
