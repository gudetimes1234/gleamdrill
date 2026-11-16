def merge(intervals):
    # Sorted by start, an interval can only ever overlap the one being built, so
    # a single pass is enough: extend it, or begin a new one.
    out = []  # @1
    for start, end in sorted(intervals):  # @2
        if out and start <= out[-1][1]:  # @3
            out[-1][1] = max(out[-1][1], end)  # @4
        else:  # @5
            out.append([start, end])  # @5
    return out  # @6
