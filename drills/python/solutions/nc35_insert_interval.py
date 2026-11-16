def insert(intervals, newInterval):
    start, end = newInterval  # @1
    out = []  # @2
    i = 0  # @2

    # The input is already sorted, so the list falls into three runs: everything
    # that finishes before the new one starts, everything that touches it, and
    # everything that starts after it ends.
    while i < len(intervals) and intervals[i][1] < start:  # @3
        out.append(intervals[i])  # @4
        i += 1  # @4

    while i < len(intervals) and intervals[i][0] <= end:  # @5
        start = min(start, intervals[i][0])  # @6
        end = max(end, intervals[i][1])  # @7
        i += 1  # @8

    out.append([start, end])  # @9
    return out + intervals[i:]  # @10
