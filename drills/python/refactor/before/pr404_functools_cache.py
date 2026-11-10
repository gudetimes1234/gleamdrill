_cache = {}


def ways_to_climb(n):
    if n in _cache:
        return _cache[n]
    if n <= 1:
        result = 1
    else:
        result = ways_to_climb(n - 1) + ways_to_climb(n - 2)
    _cache[n] = result
    return result
