def cloneGraph(adjacency, start):
    if not (0 <= start < len(adjacency)):
        return []

    reached = set()

    # Depth-first. The node is marked *before* recursing into its neighbours,
    # which is what makes a cycle terminate -- marking afterwards would let the
    # traversal reach the same node again while it was still being visited.
    def visit(node):
        if node in reached or not (0 <= node < len(adjacency)):
            return
        reached.add(node)
        for neighbour in adjacency[node]:
            visit(neighbour)

    visit(start)
    return renumber(adjacency, reached)


def renumber(adjacency, reached):
    ordered = sorted(reached)
    numbering = {node: i for i, node in enumerate(ordered)}
    return [
        [numbering[n] for n in adjacency[node] if n in numbering] for node in ordered
    ]
