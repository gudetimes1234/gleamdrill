import heapq


def swimInWater(grid):
    if not grid:  # @1
        return 0  # @1

    n = len(grid)  # @2
    target = (n - 1, n - 1)  # @2

    # Dijkstra's, with "cost of a path" redefined from the sum of its steps to
    # the largest step in it -- the water only has to rise once. Everything else
    # about the algorithm is unchanged, which is the point: settle the cheapest
    # reachable cell, and the first time the far corner is settled that cost is
    # the answer.
    seen = set()  # @3
    frontier = [(grid[0][0], 0, 0)]  # @4
    while frontier:  # @5
        cost, r, c = heapq.heappop(frontier)  # @6
        if (r, c) == target:  # @7
            return cost  # @7
        if (r, c) in seen:  # @8
            continue  # @8
        seen.add((r, c))  # @9
        for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):  # @10
            if 0 <= nr < n and 0 <= nc < len(grid[nr]) and (nr, nc) not in seen:  # @11
                heapq.heappush(frontier, (max(cost, grid[nr][nc]), nr, nc))  # @12

    return -1  # @13
