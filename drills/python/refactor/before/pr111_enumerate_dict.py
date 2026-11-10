def positions(names):
    result = {}
    i = 0
    for name in names:
        result[name] = i
        i += 1
    return result
