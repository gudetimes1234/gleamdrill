from collections import deque


def maxAreaOfIsland(grid):
    land = {
        (r, c)
        for r, row in enumerate(grid)
        for c, value in enumerate(row)
        if value == 1
    }

    # Breadth-first instead. For a component's *size* the traversal order does
    # not matter at all -- either visits every square exactly once -- so the
    # choice is about the machine: a queue keeps the memory proportional to the
    # frontier rather than to the deepest path, which is what saves a long thin
    # island from overflowing the stack.
    seen = set()
    best = 0

    for at in land:
        if at in seen:
            continue
        area = 0
        frontier = deque([at])
        while frontier:
            r, c = frontier.popleft()
            if (r, c) not in land or (r, c) in seen:
                continue
            seen.add((r, c))
            area += 1
            frontier.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])
        best = max(best, area)

    return best
