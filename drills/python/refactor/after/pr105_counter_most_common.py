from collections import Counter


def top_words(words, n):
    return Counter(words).most_common(n)
