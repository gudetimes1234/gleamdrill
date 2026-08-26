def merge(intervals):
    # Sorted by start, an interval can only ever overlap the one being built, so
    # a single pass is enough: extend it, or begin a new one.
    out = []
    for start, end in sorted(intervals):
        if out and start <= out[-1][1]:
            out[-1][1] = max(out[-1][1], end)
        else:
            out.append([start, end])
    return out
