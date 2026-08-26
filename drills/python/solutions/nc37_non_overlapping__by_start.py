def eraseOverlapIntervals(intervals):
    # Sorted by start instead: on an overlap you must drop one of the two, and
    # dropping whichever ends later is always at least as good. Same greedy
    # argument, made at the moment of the clash rather than in the sort order.
    removed = 0
    last_end = float("-inf")

    for start, end in sorted(intervals):
        if start >= last_end:
            last_end = end
        else:
            removed += 1
            last_end = min(last_end, end)

    return removed
