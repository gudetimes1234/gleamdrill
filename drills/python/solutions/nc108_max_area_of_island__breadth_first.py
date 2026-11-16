from collections import deque


def maxAreaOfIsland(grid):
    land = {  # @1
        (r, c)  # @1
        for r, row in enumerate(grid)  # @1
        for c, value in enumerate(row)  # @1
        if value == 1  # @1
    }  # @1

    # Breadth-first instead. For a component's *size* the traversal order does
    # not matter at all -- either visits every square exactly once -- so the
    # choice is about the machine: a queue keeps the memory proportional to the
    # frontier rather than to the deepest path, which is what saves a long thin
    # island from overflowing the stack.
    seen = set()  # @2
    best = 0  # @3

    for at in land:  # @4
        if at in seen:  # @5
            continue  # @5
        area = 0  # @6
        frontier = deque([at])  # @7
        while frontier:  # @8
            r, c = frontier.popleft()  # @9
            if (r, c) not in land or (r, c) in seen:  # @10
                continue  # @10
            seen.add((r, c))  # @11
            area += 1  # @12
            frontier.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])  # @13
        best = max(best, area)  # @14

    return best  # @15
