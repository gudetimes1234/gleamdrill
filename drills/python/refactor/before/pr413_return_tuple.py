def min_max(values, result):
    result.append(min(values))
    result.append(max(values))


def spread(values):
    result = []
    min_max(values, result)
    return result[1] - result[0]
