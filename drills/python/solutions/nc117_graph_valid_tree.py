def validTree(n, edges):
    # A graph with no nodes at all is vacuously a tree, provided it has no edges
    # either -- worth stating, because the n-1 edge count says otherwise.
    if n <= 0:
        return not edges

    # A tree is two conditions at once: connected, and no cycles. Checking both
    # separately is unnecessary -- with exactly n-1 edges, connected implies
    # acyclic and acyclic implies connected, so testing the edge count plus
    # either one is enough. Here it is the count plus reachability.
    if len(edges) != n - 1:
        return False

    adjacency = {node: [] for node in range(n)}
    for a, b in edges:
        adjacency[a].append(b)
        adjacency[b].append(a)

    seen = set()
    stack = [0]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        stack.extend(adjacency[node])

    return len(seen) == n
