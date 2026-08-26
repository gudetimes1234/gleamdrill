def cloneGraph(adjacency, start):
    if not (0 <= start < len(adjacency)):
        return []

    # The set of nodes already dealt with is the whole problem. Without it a
    # cycle sends the traversal round forever; with it, a node already reached
    # is simply skipped. Only the component containing the start is copied,
    # which is what the reachable set also decides.
    reached = set()
    frontier = [start]
    while frontier:
        node = frontier.pop(0)
        if node in reached or not (0 <= node < len(adjacency)):
            continue
        reached.add(node)
        frontier.extend(adjacency[node])

    return renumber(adjacency, reached)


# Reachable nodes renumbered by their original index, ascending. Numbering by
# *discovery* order would make the answer depend on whether the traversal was
# breadth- or depth-first, which is not part of the problem.
def renumber(adjacency, reached):
    ordered = sorted(reached)
    numbering = {node: i for i, node in enumerate(ordered)}
    return [
        [numbering[n] for n in adjacency[node] if n in numbering] for node in ordered
    ]
