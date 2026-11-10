def count_long(words, n):
    return sum(1 for word in words if len(word) > n)
