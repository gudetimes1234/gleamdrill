def swimInWater(grid):
    if not grid:
        return 0

    n = len(grid)
    target = (n - 1, n - 1)

    def reaches(limit):
        # The target has to be passable itself, so its depth is checked before
        # it counts as reached.
        if grid[0][0] > limit:
            return False
        seen = set()
        stack = [(0, 0)]
        while stack:
            r, c = stack.pop()
            if (r, c) in seen or grid[r][c] > limit:
                continue
            if (r, c) == target:
                return True
            seen.add((r, c))
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < n and 0 <= nc < len(grid[nr]):
                    stack.append((nr, nc))
        return False

    # Reachability at time t is monotone: once the corner can be reached it
    # stays reachable as the water rises further. That is exactly the shape
    # binary search needs, so the question turns from "what is the cheapest
    # path" into "is it possible yet", answered by a plain flood fill.
    low, high = grid[0][0], n * n - 1
    while low < high:
        middle = (low + high) // 2
        if reaches(middle):
            high = middle
        else:
            low = middle + 1
    return low
