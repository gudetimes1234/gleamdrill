def minCostConnectPoints(points):
    if not points:
        return 0

    # Prim's algorithm. Each outside point remembers only its distance to the
    # tree so far, so adding a point is one pass to find the nearest and one
    # pass to update -- O(n^2) total, which is what a complete graph costs
    # anyway, and it needs no heap. Cheapest-edge-first is safe because the
    # cheapest edge leaving any set of points is always in some minimum
    # spanning tree.
    start = points[0]
    outside = [[point, distance(start, point)] for point in points[1:]]
    total = 0

    while outside:
        best = min(range(len(outside)), key=lambda i: outside[i][1])
        point, cost = outside.pop(best)
        total += cost
        for entry in outside:
            entry[1] = min(entry[1], distance(point, entry[0]))

    return total


def distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])
