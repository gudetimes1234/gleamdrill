from collections import deque

INFINITY = 2147483647


def wallsAndGates(rooms):
    if not rooms or not rooms[0]:
        return rooms

    board = [list(row) for row in rooms]
    rows, columns = len(board), len(board[0])

    # One breadth-first search starting from *all* the gates at once, rather
    # than one search per empty room. Because every source begins at distance
    # zero together, the first time a room is reached is by its nearest gate --
    # the multi-source search does the whole grid in one pass.
    frontier = deque(
        (r, c) for r in range(rows) for c in range(columns) if board[r][c] == 0
    )

    while frontier:
        r, c = frontier.popleft()
        for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
            if 0 <= nr < rows and 0 <= nc < columns and board[nr][nc] == INFINITY:
                board[nr][nc] = board[r][c] + 1
                frontier.append((nr, nc))

    return board
