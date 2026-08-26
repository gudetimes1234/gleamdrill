def spiralOrder(matrix):
    if not matrix:
        return []

    # Four boundaries closing in. Each side is walked and then retired, and the
    # two guards below are the ones everybody forgets: on a single remaining row
    # or column the bottom and top edges are the same edge, so walking both
    # would emit it twice.
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    out = []

    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            out.append(matrix[top][c])
        for r in range(top + 1, bottom + 1):
            out.append(matrix[r][right])
        if top < bottom:
            for c in range(right - 1, left - 1, -1):
                out.append(matrix[bottom][c])
        if left < right:
            for r in range(bottom - 1, top, -1):
                out.append(matrix[r][left])
        top, bottom, left, right = top + 1, bottom - 1, left + 1, right - 1

    return out
