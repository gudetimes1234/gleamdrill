def min_max(values):
    return min(values), max(values)


def spread(values):
    low, high = min_max(values)
    return high - low
