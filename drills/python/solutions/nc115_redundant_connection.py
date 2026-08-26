def findRedundantConnection(edges):
    # n nodes and n edges means exactly one cycle. Union-find spots it the
    # moment an edge joins two nodes already connected -- and because the edges
    # are processed in order, the first such edge is the last one that could be
    # removed, which is what the problem asks for.
    parents = {}

    def find(node):
        while parents.get(node, node) != node:
            node = parents[node]
        return node

    found = None
    for a, b in edges:
        rootA, rootB = find(a), find(b)
        if rootA == rootB:
            found = (a, b)
        else:
            parents[rootA] = rootB

    return list(found) if found else []
