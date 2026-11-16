def maxAreaOfIsland(grid):
    land = {  # @1
        (r, c)  # @1
        for r, row in enumerate(grid)  # @1
        for c, value in enumerate(row)  # @1
        if value == 1  # @1
    }  # @1

    # The same component search as counting islands, except each search reports
    # how much it covered rather than just that it happened.
    seen = set()  # @2
    best = 0  # @3

    for at in land:  # @4
        if at in seen:  # @5
            continue  # @5
        area = 0  # @6
        stack = [at]  # @7
        while stack:  # @8
            r, c = stack.pop()  # @9
            if (r, c) not in land or (r, c) in seen:  # @10
                continue  # @10
            seen.add((r, c))  # @11
            area += 1  # @12
            stack.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])  # @13
        best = max(best, area)  # @14

    return best  # @15
