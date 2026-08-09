def sortByLength(words):
    return sorted(words, key=len)

def sortPairs(pairs):
    return sorted(pairs, key=lambda p: (p[0], -p[1]))
