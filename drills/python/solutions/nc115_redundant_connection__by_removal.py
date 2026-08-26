def findRedundantConnection(edges):
    # Try removing each edge, latest first, and keep the first removal that
    # leaves a tree. O(n^2) against union-find's near-linear, but it needs no
    # new structure -- and it says the specification outright: the answer is the
    # last edge whose absence would make the graph a tree.
    nodes = {node for edge in edges for node in edge}

    for candidate in reversed(edges):
        remaining = [edge for edge in edges if edge != candidate]
        if isTree(remaining, nodes):
            return list(candidate)

    return []


def isTree(edges, nodes):
    if not nodes:
        return True
    if len(edges) != len(nodes) - 1:
        return False

    adjacency = {node: [] for node in nodes}
    for a, b in edges:
        adjacency[a].append(b)
        adjacency[b].append(a)

    start = next(iter(nodes))
    seen = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        stack.extend(adjacency[node])

    return len(seen) == len(nodes)
