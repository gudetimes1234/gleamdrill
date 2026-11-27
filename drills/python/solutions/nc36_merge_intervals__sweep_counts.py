def merge(intervals):
    # Forget the intervals and keep only their edges: +1 where one opens, -1
    # where one closes. A merged interval runs from the edge that lifts the
    # running count off zero to the edge that drops it back.
    #
    # Sorting -delta ascending puts opens before closes at the same coordinate,
    # so touching intervals join.
    edges = []  # @1
    for start, end in intervals:  # @2
        edges.append((start, 1))  # @3
        edges.append((end, -1))  # @3
    edges.sort(key=lambda edge: (edge[0], -edge[1]))  # @4

    out = []  # @5
    depth = 0  # @5
    start = 0  # @5
    for position, delta in edges:  # @6
        if depth == 0:  # @7
            start = position  # @7
        depth += delta  # @8
        if depth == 0:  # @9
            out.append([start, position])  # @9
    return out  # @10
