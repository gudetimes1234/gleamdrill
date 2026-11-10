from functools import cache


@cache
def ways_to_climb(n):
    if n <= 1:
        return 1
    return ways_to_climb(n - 1) + ways_to_climb(n - 2)
