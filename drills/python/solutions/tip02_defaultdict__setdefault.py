def groupByLength(words):
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups
