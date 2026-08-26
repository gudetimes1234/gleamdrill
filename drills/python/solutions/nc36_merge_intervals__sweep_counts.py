def merge(intervals):
    # Forget the intervals and keep only their edges: +1 where one opens, -1
    # where one closes. A merged interval runs from the edge that lifts the
    # running count off zero to the edge that drops it back.
    #
    # Sorting -delta ascending puts opens before closes at the same coordinate,
    # so touching intervals join.
    edges = []
    for start, end in intervals:
        edges.append((start, 1))
        edges.append((end, -1))
    edges.sort(key=lambda edge: (edge[0], -edge[1]))

    out = []
    depth = 0
    start = 0
    for position, delta in edges:
        if depth == 0:
            start = position
        depth += delta
        if depth == 0:
            out.append([start, position])
    return out
