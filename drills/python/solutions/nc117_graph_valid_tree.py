def validTree(n, edges):
    # A graph with no nodes at all is vacuously a tree, provided it has no edges
    # either -- worth stating, because the n-1 edge count says otherwise.
    if n <= 0:  # @1
        return not edges  # @1

    # A tree is two conditions at once: connected, and no cycles. Checking both
    # separately is unnecessary -- with exactly n-1 edges, connected implies
    # acyclic and acyclic implies connected, so testing the edge count plus
    # either one is enough. Here it is the count plus reachability.
    if len(edges) != n - 1:  # @2
        return False  # @2

    adjacency = {node: [] for node in range(n)}  # @3
    for a, b in edges:  # @4
        adjacency[a].append(b)  # @5
        adjacency[b].append(a)  # @5

    seen = set()  # @6
    stack = [0]  # @7
    while stack:  # @8
        node = stack.pop()  # @9
        if node in seen:  # @10
            continue  # @10
        seen.add(node)  # @11
        stack.extend(adjacency[node])  # @12

    return len(seen) == n  # @13
