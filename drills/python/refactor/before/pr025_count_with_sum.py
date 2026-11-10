def count_long(words, n):
    count = 0
    for word in words:
        if len(word) > n:
            count += 1
    return count
