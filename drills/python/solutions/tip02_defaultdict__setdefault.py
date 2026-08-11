def groupByLength(words):
    # setdefault does the same job as defaultdict without changing the type of
    # the dictionary — handy when the result is returned or serialised, since
    # there is no default factory left attached to it.
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups
