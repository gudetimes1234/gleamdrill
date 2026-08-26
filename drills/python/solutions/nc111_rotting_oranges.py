from collections import deque


def orangesRotting(grid):
    rotten = deque()
    fresh = 0

    for r, row in enumerate(grid):
        for c, value in enumerate(row):
            if value == 2:
                rotten.append((r, c))
            elif value == 1:
                fresh += 1

    # Breadth-first from *every* rotten orange at once, which is what makes the
    # level count a time: all the sources start at minute zero together, so each
    # wave of the search is one minute. A separate search per source would give
    # distances from each, and then need combining.
    seen = set(rotten)
    minutes = 0

    while rotten and fresh:
        following = deque()
        for r, c in rotten:
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]):
                    if grid[nr][nc] == 1 and (nr, nc) not in seen:
                        seen.add((nr, nc))
                        fresh -= 1
                        following.append((nr, nc))
        if not following:
            break
        rotten = following
        minutes += 1

    return minutes if fresh == 0 else -1
