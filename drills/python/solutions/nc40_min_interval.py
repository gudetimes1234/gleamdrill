def minInterval(intervals, queries):
    out = []
    for query in queries:
        lengths = [end - start + 1 for start, end in intervals if start <= query <= end]
        out.append(min(lengths) if lengths else -1)
    return out
