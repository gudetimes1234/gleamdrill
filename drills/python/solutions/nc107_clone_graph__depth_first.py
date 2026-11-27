def cloneGraph(adjacency, start):
    if not (0 <= start < len(adjacency)):  # @1
        return []  # @1

    reached = set()  # @2

    # Depth-first. The node is marked *before* recursing into its neighbours,
    # which is what makes a cycle terminate -- marking afterwards would let the
    # traversal reach the same node again while it was still being visited.
    def visit(node):
        if node in reached or not (0 <= node < len(adjacency)):  # @3
            return  # @3
        reached.add(node)  # @4
        for neighbour in adjacency[node]:  # @5
            visit(neighbour)  # @6

    visit(start)  # @7
    return renumber(adjacency, reached)  # @8


def renumber(adjacency, reached):
    ordered = sorted(reached)
    numbering = {node: i for i, node in enumerate(ordered)}
    return [
        [numbering[n] for n in adjacency[node] if n in numbering] for node in ordered
    ]
