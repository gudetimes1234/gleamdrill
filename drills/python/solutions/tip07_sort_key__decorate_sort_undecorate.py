def sortByLength(words):
    # Decorate, sort, undecorate: attach the sort key to each item, sort the
    # pairs, then strip it. `key=` is this pattern built into sorted().
    decorated = [(len(word), word) for word in words]
    decorated.sort(key=lambda pair: pair[0])
    return [word for _, word in decorated]

def sortPairs(pairs):
    decorated = [((pair[0], -pair[1]), pair) for pair in pairs]
    decorated.sort(key=lambda entry: entry[0])
    return [pair for _, pair in decorated]
