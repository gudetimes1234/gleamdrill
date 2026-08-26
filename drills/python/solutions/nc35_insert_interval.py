def insert(intervals, newInterval):
    start, end = newInterval
    out = []
    i = 0

    # The input is already sorted, so the list falls into three runs: everything
    # that finishes before the new one starts, everything that touches it, and
    # everything that starts after it ends.
    while i < len(intervals) and intervals[i][1] < start:
        out.append(intervals[i])
        i += 1

    while i < len(intervals) and intervals[i][0] <= end:
        start = min(start, intervals[i][0])
        end = max(end, intervals[i][1])
        i += 1

    out.append([start, end])
    return out + intervals[i:]
