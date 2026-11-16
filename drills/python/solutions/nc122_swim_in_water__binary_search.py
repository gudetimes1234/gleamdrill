def swimInWater(grid):
    if not grid:  # @1
        return 0  # @1

    n = len(grid)  # @2
    target = (n - 1, n - 1)  # @2

    def reaches(limit):
        # The target has to be passable itself, so its depth is checked before
        # it counts as reached.
        if grid[0][0] > limit:  # @3
            return False  # @3
        seen = set()  # @4
        stack = [(0, 0)]  # @4
        while stack:  # @5
            r, c = stack.pop()  # @6
            if (r, c) in seen or grid[r][c] > limit:  # @7
                continue  # @7
            if (r, c) == target:  # @8
                return True  # @8
            seen.add((r, c))  # @9
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):  # @10
                if 0 <= nr < n and 0 <= nc < len(grid[nr]):  # @10
                    stack.append((nr, nc))  # @10
        return False  # @11

    # Reachability at time t is monotone: once the corner can be reached it
    # stays reachable as the water rises further. That is exactly the shape
    # binary search needs, so the question turns from "what is the cheapest
    # path" into "is it possible yet", answered by a plain flood fill.
    low, high = grid[0][0], n * n - 1  # @12
    while low < high:  # @13
        middle = (low + high) // 2  # @14
        if reaches(middle):  # @15
            high = middle  # @15
        else:  # @16
            low = middle + 1  # @16
    return low  # @17
