def eraseOverlapIntervals(intervals):
    # Greedy on the end: among any set of intervals competing for the same
    # space, keeping the one that finishes earliest leaves the most room for
    # whatever comes next, and can never be worse.
    removed = 0
    last_end = float("-inf")

    for start, end in sorted(intervals, key=lambda interval: interval[1]):
        if start >= last_end:
            last_end = end
        else:
            removed += 1

    return removed
