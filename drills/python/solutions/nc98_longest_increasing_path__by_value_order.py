def longestIncreasingPath(matrix):
    if not matrix or not matrix[0]:  # @1
        return 0  # @1

    # The same acyclicity used the other way round: process the squares from
    # largest value to smallest, and by the time a square is reached every
    # square it can move to has already been settled. A topological order
    # without ever building the graph -- sorting by value *is* the order.
    cells = [  # @2
        (matrix[r][c], r, c) for r in range(len(matrix)) for c in range(len(matrix[0]))  # @2
    ]
    lengths = {}  # @3

    for value, r, c in sorted(cells, reverse=True):  # @4
        best = 1  # @5
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):  # @6
            nr, nc = r + dr, c + dc  # @7
            if 0 <= nr < len(matrix) and 0 <= nc < len(matrix[0]):  # @8
                if matrix[nr][nc] > value:  # @9
                    best = max(best, 1 + lengths[(nr, nc)])  # @10
        lengths[(r, c)] = best  # @11

    return max(lengths.values())  # @12
