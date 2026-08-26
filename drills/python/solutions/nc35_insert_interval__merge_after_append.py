def insert(intervals, newInterval):
    # Drop the new interval on the end and run the general merge. Throws away
    # the fact that the input was sorted -- O(n log n) rather than O(n) -- but
    # it reuses a solution you already have rather than a three-way split.
    out = []
    for start, end in sorted(intervals + [newInterval]):
        if out and start <= out[-1][1]:
            out[-1][1] = max(out[-1][1], end)
        else:
            out.append([start, end])
    return out
