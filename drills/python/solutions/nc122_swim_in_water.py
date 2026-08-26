import heapq


def swimInWater(grid):
    if not grid:
        return 0

    n = len(grid)
    target = (n - 1, n - 1)

    # Dijkstra's, with "cost of a path" redefined from the sum of its steps to
    # the largest step in it -- the water only has to rise once. Everything else
    # about the algorithm is unchanged, which is the point: settle the cheapest
    # reachable cell, and the first time the far corner is settled that cost is
    # the answer.
    seen = set()
    frontier = [(grid[0][0], 0, 0)]
    while frontier:
        cost, r, c = heapq.heappop(frontier)
        if (r, c) == target:
            return cost
        if (r, c) in seen:
            continue
        seen.add((r, c))
        for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
            if 0 <= nr < n and 0 <= nc < len(grid[nr]) and (nr, nc) not in seen:
                heapq.heappush(frontier, (max(cost, grid[nr][nc]), nr, nc))

    return -1
