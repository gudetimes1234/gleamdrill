def uniquePaths(m, n):
    if m <= 0 or n <= 0:
        return 0

    # Only right and down moves, so the ways to reach a square are the ways to
    # reach the one above plus the one to its left. Rows are filled top to
    # bottom, and only the row above is ever needed -- so one row of counters
    # does for the whole grid.
    row = [1] * n
    for _ in range(m - 1):
        for c in range(1, n):
            row[c] += row[c - 1]

    return row[-1]
