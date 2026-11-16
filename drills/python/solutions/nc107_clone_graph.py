def cloneGraph(adjacency, start):
    if not (0 <= start < len(adjacency)):  # @1
        return []  # @1

    # The set of nodes already dealt with is the whole problem. Without it a
    # cycle sends the traversal round forever; with it, a node already reached
    # is simply skipped. Only the component containing the start is copied,
    # which is what the reachable set also decides.
    reached = set()  # @2
    frontier = [start]  # @3
    while frontier:  # @4
        node = frontier.pop(0)  # @5
        if node in reached or not (0 <= node < len(adjacency)):  # @6
            continue  # @6
        reached.add(node)  # @7
        frontier.extend(adjacency[node])  # @8

    return renumber(adjacency, reached)  # @9


# Reachable nodes renumbered by their original index, ascending. Numbering by
# *discovery* order would make the answer depend on whether the traversal was
# breadth- or depth-first, which is not part of the problem.
def renumber(adjacency, reached):
    ordered = sorted(reached)
    numbering = {node: i for i, node in enumerate(ordered)}
    return [
        [numbering[n] for n in adjacency[node] if n in numbering] for node in ordered
    ]
