def validTree(n, edges):
    if n <= 0:  # @1
        return not edges  # @1

    # Both conditions from one pass. An edge joining two nodes already connected
    # is a cycle, so if none does, the graph is a forest -- and a forest with
    # n-1 merges is a single tree. No adjacency list and no traversal.
    parents = {}  # @2

    def find(node):
        while parents.get(node, node) != node:  # @3
            node = parents[node]  # @4
        return node  # @5

    merges = 0  # @6
    for a, b in edges:  # @7
        rootA, rootB = find(a), find(b)  # @8
        if rootA == rootB:  # @9
            return False  # @9
        parents[rootA] = rootB  # @10
        merges += 1  # @11

    return merges == n - 1  # @12
