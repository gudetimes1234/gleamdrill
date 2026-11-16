def minCostConnectPoints(points):
    # Kruskal's algorithm: every edge, cheapest first, kept only when it joins
    # two pieces that are not already connected. Union-find is what makes that
    # test cheap. The trade against Prim's is the sort -- O(n^2 log n) edges
    # here against Prim's O(n^2) -- but Kruskal never needs the points
    # themselves, only the edge list, so it is the one that generalises to a
    # sparse graph.
    edges = []  # @1
    for i in range(len(points)):  # @2
        for j in range(i + 1, len(points)):  # @2
            edges.append((distance(points[i], points[j]), i, j))  # @3
    edges.sort()  # @4

    parents = {}  # @5

    def find(node):
        while parents.get(node, node) != node:  # @6
            node = parents[node]  # @6
        return node  # @7

    total = 0  # @8
    for cost, i, j in edges:  # @9
        rootI, rootJ = find(i), find(j)  # @10
        if rootI != rootJ:  # @11
            parents[rootI] = rootJ  # @12
            total += cost  # @13

    return total  # @14


def distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])
