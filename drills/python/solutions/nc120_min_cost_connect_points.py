def minCostConnectPoints(points):
    if not points:  # @1
        return 0  # @1

    # Prim's algorithm. Each outside point remembers only its distance to the
    # tree so far, so adding a point is one pass to find the nearest and one
    # pass to update -- O(n^2) total, which is what a complete graph costs
    # anyway, and it needs no heap. Cheapest-edge-first is safe because the
    # cheapest edge leaving any set of points is always in some minimum
    # spanning tree.
    start = points[0]  # @2
    outside = [[point, distance(start, point)] for point in points[1:]]  # @3
    total = 0  # @4

    while outside:  # @5
        best = min(range(len(outside)), key=lambda i: outside[i][1])  # @6
        point, cost = outside.pop(best)  # @7
        total += cost  # @8
        for entry in outside:  # @9
            entry[1] = min(entry[1], distance(point, entry[0]))  # @10

    return total  # @11


def distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])
