def minDistance(word1, word2):
    # Three edits, three neighbours in the table: replace comes from the
    # diagonal, delete from above, insert from the left. Equal characters cost
    # nothing and take the diagonal outright -- the whole algorithm is those
    # four lines. The first row and column are the cost of building a string
    # from nothing, which is its length.
    previous = list(range(len(word2) + 1))

    for i, a in enumerate(word1, start=1):
        row = [i] + [0] * len(word2)
        for j, b in enumerate(word2, start=1):
            row[j] = previous[j - 1] if a == b else 1 + min(previous[j - 1], previous[j], row[j - 1])
        previous = row

    return previous[len(word2)]
