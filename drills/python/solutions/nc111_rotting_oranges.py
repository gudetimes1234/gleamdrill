from collections import deque


def orangesRotting(grid):
    rotten = deque()  # @1
    fresh = 0  # @2

    for r, row in enumerate(grid):  # @3
        for c, value in enumerate(row):  # @3
            if value == 2:  # @4
                rotten.append((r, c))  # @4
            elif value == 1:  # @5
                fresh += 1  # @5

    # Breadth-first from *every* rotten orange at once, which is what makes the
    # level count a time: all the sources start at minute zero together, so each
    # wave of the search is one minute. A separate search per source would give
    # distances from each, and then need combining.
    seen = set(rotten)  # @6
    minutes = 0  # @7

    while rotten and fresh:  # @8
        following = deque()  # @9
        for r, c in rotten:  # @10
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):  # @11
                if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]):  # @12
                    if grid[nr][nc] == 1 and (nr, nc) not in seen:  # @13
                        seen.add((nr, nc))  # @14
                        fresh -= 1  # @14
                        following.append((nr, nc))  # @15
        if not following:  # @16
            break  # @16
        rotten = following  # @17
        minutes += 1  # @18

    return minutes if fresh == 0 else -1  # @19
