def findRedundantConnection(edges):
    # n nodes and n edges means exactly one cycle. Union-find spots it the
    # moment an edge joins two nodes already connected -- and because the edges
    # are processed in order, the first such edge is the last one that could be
    # removed, which is what the problem asks for.
    parents = {}  # @1

    def find(node):
        while parents.get(node, node) != node:  # @2
            node = parents[node]  # @3
        return node  # @4

    found = None  # @5
    for a, b in edges:  # @6
        rootA, rootB = find(a), find(b)  # @7
        if rootA == rootB:  # @8
            found = (a, b)  # @8
        else:  # @9
            parents[rootA] = rootB  # @9

    return list(found) if found else []  # @10
