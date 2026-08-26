def maxAreaOfIsland(grid):
    land = {
        (r, c)
        for r, row in enumerate(grid)
        for c, value in enumerate(row)
        if value == 1
    }

    # The same component search as counting islands, except each search reports
    # how much it covered rather than just that it happened.
    seen = set()
    best = 0

    for at in land:
        if at in seen:
            continue
        area = 0
        stack = [at]
        while stack:
            r, c = stack.pop()
            if (r, c) not in land or (r, c) in seen:
                continue
            seen.add((r, c))
            area += 1
            stack.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])
        best = max(best, area)

    return best
