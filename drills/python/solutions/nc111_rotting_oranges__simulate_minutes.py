def orangesRotting(grid):
    board = [list(row) for row in grid]
    minutes = 0

    # Rewrite the whole grid once per minute rather than tracking a frontier.
    # Much more work -- every square is examined every minute, not just the ones
    # next to the rot -- but it is the problem statement executed literally, and
    # it makes plain that the answer counts *rounds*, not distances.
    while True:
        following = [
            [
                2
                if value == 1
                and any(
                    0 <= nr < len(board) and 0 <= nc < len(board[0]) and board[nr][nc] == 2
                    for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1))
                )
                else value
                for c, value in enumerate(row)
            ]
            for r, row in enumerate(board)
        ]
        if following == board:
            # Nothing changed: either everything has rotted or what is left
            # never will.
            return -1 if any(1 in row for row in board) else minutes
        board = following
        minutes += 1
