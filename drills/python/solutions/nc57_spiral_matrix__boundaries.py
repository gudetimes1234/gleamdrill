def spiralOrder(matrix):
    if not matrix:  # @1
        return []  # @1

    # Four boundaries closing in. Each side is walked and then retired, and the
    # two guards below are the ones everybody forgets: on a single remaining row
    # or column the bottom and top edges are the same edge, so walking both
    # would emit it twice.
    top, bottom = 0, len(matrix) - 1  # @2
    left, right = 0, len(matrix[0]) - 1  # @3
    out = []  # @4

    while top <= bottom and left <= right:  # @5
        for c in range(left, right + 1):  # @6
            out.append(matrix[top][c])  # @7
        for r in range(top + 1, bottom + 1):  # @8
            out.append(matrix[r][right])  # @9
        if top < bottom:  # @10
            for c in range(right - 1, left - 1, -1):  # @11
                out.append(matrix[bottom][c])  # @11
        if left < right:  # @12
            for r in range(bottom - 1, top, -1):  # @13
                out.append(matrix[r][left])  # @13
        top, bottom, left, right = top + 1, bottom - 1, left + 1, right - 1  # @14

    return out  # @15
