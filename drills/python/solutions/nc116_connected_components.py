def countComponents(n, edges):
    # Start with n components and merge: every edge whose ends are not already
    # together removes one. No traversal, no adjacency list -- the count falls
    # straight out of how many merges actually happened.
    parents = {}

    def find(node):
        while parents.get(node, node) != node:
            node = parents[node]
        return node

    merges = 0
    for a, b in edges:
        rootA, rootB = find(a), find(b)
        if rootA != rootB:
            parents[rootA] = rootB
            merges += 1

    return n - merges
