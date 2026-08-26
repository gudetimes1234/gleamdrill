from collections import deque

INFINITY = 2147483647


def wallsAndGates(rooms):
    if not rooms or not rooms[0]:
        return rooms

    rows, columns = len(rooms), len(rooms[0])

    # One search per empty room, looking for the nearest gate. The answer is the
    # same and the cost is not: every room re-explores the same corridors. Worth
    # writing once to see why starting from the gates instead -- the sources,
    # not the questions -- collapses all of it into a single pass.
    def nearest(start):
        seen = {start}
        frontier = deque([start])
        steps = 0
        while frontier:
            following = deque()
            for r, c in frontier:
                if rooms[r][c] == 0:
                    return steps
                for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                    if 0 <= nr < rows and 0 <= nc < columns:
                        if rooms[nr][nc] != -1 and (nr, nc) not in seen:
                            seen.add((nr, nc))
                            following.append((nr, nc))
            frontier = following
            steps += 1
        return INFINITY

    return [
        [nearest((r, c)) if value == INFINITY else value for c, value in enumerate(row)]
        for r, row in enumerate(rooms)
    ]
