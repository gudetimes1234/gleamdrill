from itertools import groupby


def runs(text):
    return [(ch, len(list(group))) for ch, group in groupby(text)]
