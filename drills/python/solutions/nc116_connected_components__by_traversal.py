def countComponents(n, edges):
    adjacency = {node: [] for node in range(n)}  # @1
    for a, b in edges:  # @2
        adjacency[a].append(b)  # @3
        adjacency[b].append(a)  # @3

    # One search per unvisited node, exactly as with islands on a grid -- the
    # same counting-components idea with an adjacency list instead of
    # coordinates. Worth seeing side by side with union-find: this one needs the
    # whole graph up front, the other can take edges as they arrive.
    seen = set()  # @4
    count = 0  # @5

    for node in range(n):  # @6
        if node in seen:  # @7
            continue  # @7
        count += 1  # @8
        stack = [node]  # @9
        while stack:  # @10
            current = stack.pop()  # @11
            if current in seen:  # @12
                continue  # @12
            seen.add(current)  # @13
            stack.extend(adjacency[current])  # @14

    return count  # @15
