def solve(board):
    if not board or not board[0]:  # @1
        return board  # @1

    rows, columns = len(board), len(board[0])  # @2

    # Invert the question. "Which regions are surrounded?" needs a search per
    # region and a rule for what counts as escaping; "which regions touch an
    # edge?" is one search from the border, and everything it does not reach is
    # surrounded by definition.
    safe = set()  # @3
    stack = [  # @4
        (r, c)  # @4
        for r in range(rows)  # @4
        for c in range(columns)  # @4
        if (r in (0, rows - 1) or c in (0, columns - 1)) and board[r][c] == "O"  # @4
    ]  # @4

    while stack:  # @5
        r, c = stack.pop()  # @6
        if not (0 <= r < rows and 0 <= c < columns):  # @7
            continue  # @7
        if (r, c) in safe or board[r][c] != "O":  # @8
            continue  # @8
        safe.add((r, c))  # @9
        stack.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])  # @10

    return [  # @11
        ["X" if value == "O" and (r, c) not in safe else value for c, value in enumerate(row)]  # @11
        for r, row in enumerate(board)  # @11
    ]  # @11
