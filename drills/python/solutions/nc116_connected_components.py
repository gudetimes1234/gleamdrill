def countComponents(n, edges):
    # Start with n components and merge: every edge whose ends are not already
    # together removes one. No traversal, no adjacency list -- the count falls
    # straight out of how many merges actually happened.
    parents = {}  # @1

    def find(node):
        while parents.get(node, node) != node:  # @2
            node = parents[node]  # @3
        return node  # @4

    merges = 0  # @5
    for a, b in edges:  # @6
        rootA, rootB = find(a), find(b)  # @7
        if rootA != rootB:  # @8
            parents[rootA] = rootB  # @9
            merges += 1  # @10

    return n - merges  # @11
