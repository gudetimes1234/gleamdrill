from collections import Counter

def isAnagram(s, t):
    return Counter(s) == Counter(t)
