def countComponents(n, edges):
    adjacency = {node: [] for node in range(n)}
    for a, b in edges:
        adjacency[a].append(b)
        adjacency[b].append(a)

    # One search per unvisited node, exactly as with islands on a grid -- the
    # same counting-components idea with an adjacency list instead of
    # coordinates. Worth seeing side by side with union-find: this one needs the
    # whole graph up front, the other can take edges as they arrive.
    seen = set()
    count = 0

    for node in range(n):
        if node in seen:
            continue
        count += 1
        stack = [node]
        while stack:
            current = stack.pop()
            if current in seen:
                continue
            seen.add(current)
            stack.extend(adjacency[current])

    return count
