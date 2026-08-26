def longestIncreasingPath(matrix):
    if not matrix or not matrix[0]:
        return 0

    # The same acyclicity used the other way round: process the squares from
    # largest value to smallest, and by the time a square is reached every
    # square it can move to has already been settled. A topological order
    # without ever building the graph -- sorting by value *is* the order.
    cells = [
        (matrix[r][c], r, c) for r in range(len(matrix)) for c in range(len(matrix[0]))
    ]
    lengths = {}

    for value, r, c in sorted(cells, reverse=True):
        best = 1
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < len(matrix) and 0 <= nc < len(matrix[0]):
                if matrix[nr][nc] > value:
                    best = max(best, 1 + lengths[(nr, nc)])
        lengths[(r, c)] = best

    return max(lengths.values())
