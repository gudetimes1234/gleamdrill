def eraseOverlapIntervals(intervals):
    # Greedy on the end: among any set of intervals competing for the same
    # space, keeping the one that finishes earliest leaves the most room for
    # whatever comes next, and can never be worse.
    removed = 0  # @1
    last_end = float("-inf")  # @2

    for start, end in sorted(intervals, key=lambda interval: interval[1]):  # @3
        if start >= last_end:  # @4
            last_end = end  # @4
        else:  # @5
            removed += 1  # @5

    return removed  # @6
