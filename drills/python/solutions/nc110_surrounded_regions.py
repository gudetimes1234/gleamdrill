def solve(board):
    if not board or not board[0]:
        return board

    rows, columns = len(board), len(board[0])

    # Invert the question. "Which regions are surrounded?" needs a search per
    # region and a rule for what counts as escaping; "which regions touch an
    # edge?" is one search from the border, and everything it does not reach is
    # surrounded by definition.
    safe = set()
    stack = [
        (r, c)
        for r in range(rows)
        for c in range(columns)
        if (r in (0, rows - 1) or c in (0, columns - 1)) and board[r][c] == "O"
    ]

    while stack:
        r, c = stack.pop()
        if not (0 <= r < rows and 0 <= c < columns):
            continue
        if (r, c) in safe or board[r][c] != "O":
            continue
        safe.add((r, c))
        stack.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])

    return [
        ["X" if value == "O" and (r, c) not in safe else value for c, value in enumerate(row)]
        for r, row in enumerate(board)
    ]
