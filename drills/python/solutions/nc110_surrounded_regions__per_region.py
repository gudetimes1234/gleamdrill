def solve(board):
    if not board or not board[0]:
        return board

    rows, columns = len(board), len(board[0])

    # The direct reading: find each region, then decide whether it escapes. It
    # works, and it needs a second idea the border search does not -- the whole
    # region has to be collected before any verdict can be given, so the search
    # cannot stop early and the escape test is over the component rather than a
    # single square.
    seen = set()
    doomed = set()

    for r in range(rows):
        for c in range(columns):
            if board[r][c] != "O" or (r, c) in seen:
                continue
            region = set()
            stack = [(r, c)]
            while stack:
                rr, cc = stack.pop()
                if not (0 <= rr < rows and 0 <= cc < columns):
                    continue
                if (rr, cc) in region or board[rr][cc] != "O":
                    continue
                region.add((rr, cc))
                stack.extend([(rr - 1, cc), (rr + 1, cc), (rr, cc - 1), (rr, cc + 1)])
            seen |= region
            if not any(
                rr in (0, rows - 1) or cc in (0, columns - 1) for rr, cc in region
            ):
                doomed |= region

    return [
        ["X" if (r, c) in doomed else value for c, value in enumerate(row)]
        for r, row in enumerate(board)
    ]
