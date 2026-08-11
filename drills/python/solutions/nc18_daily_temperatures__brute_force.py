def dailyTemperatures(temperatures):
    # For each day, scan forward until it gets warmer. O(n^2), and the direct
    # reading of the question — the monotonic stack exists only to avoid
    # rescanning the same cold stretch once per day.
    result = []
    for i, temp in enumerate(temperatures):
        days = 0
        for j in range(i + 1, len(temperatures)):
            if temperatures[j] > temp:
                days = j - i
                break
        result.append(days)
    return result
