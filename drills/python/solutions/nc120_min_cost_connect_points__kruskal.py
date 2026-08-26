def minCostConnectPoints(points):
    # Kruskal's algorithm: every edge, cheapest first, kept only when it joins
    # two pieces that are not already connected. Union-find is what makes that
    # test cheap. The trade against Prim's is the sort -- O(n^2 log n) edges
    # here against Prim's O(n^2) -- but Kruskal never needs the points
    # themselves, only the edge list, so it is the one that generalises to a
    # sparse graph.
    edges = []
    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            edges.append((distance(points[i], points[j]), i, j))
    edges.sort()

    parents = {}

    def find(node):
        while parents.get(node, node) != node:
            node = parents[node]
        return node

    total = 0
    for cost, i, j in edges:
        rootI, rootJ = find(i), find(j)
        if rootI != rootJ:
            parents[rootI] = rootJ
            total += cost

    return total


def distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])
