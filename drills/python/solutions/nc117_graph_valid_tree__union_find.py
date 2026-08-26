def validTree(n, edges):
    if n <= 0:
        return not edges

    # Both conditions from one pass. An edge joining two nodes already connected
    # is a cycle, so if none does, the graph is a forest -- and a forest with
    # n-1 merges is a single tree. No adjacency list and no traversal.
    parents = {}

    def find(node):
        while parents.get(node, node) != node:
            node = parents[node]
        return node

    merges = 0
    for a, b in edges:
        rootA, rootB = find(a), find(b)
        if rootA == rootB:
            return False
        parents[rootA] = rootB
        merges += 1

    return merges == n - 1
