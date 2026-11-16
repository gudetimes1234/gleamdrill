from collections import deque

INFINITY = 2147483647


def wallsAndGates(rooms):
    if not rooms or not rooms[0]:  # @1
        return rooms  # @1

    board = [list(row) for row in rooms]  # @2
    rows, columns = len(board), len(board[0])  # @3

    # One breadth-first search starting from *all* the gates at once, rather
    # than one search per empty room. Because every source begins at distance
    # zero together, the first time a room is reached is by its nearest gate --
    # the multi-source search does the whole grid in one pass.
    frontier = deque(  # @4
        (r, c) for r in range(rows) for c in range(columns) if board[r][c] == 0  # @4
    )  # @4

    while frontier:  # @5
        r, c = frontier.popleft()  # @6
        for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):  # @7
            if 0 <= nr < rows and 0 <= nc < columns and board[nr][nc] == INFINITY:  # @8
                board[nr][nc] = board[r][c] + 1  # @9
                frontier.append((nr, nc))  # @10

    return board  # @11
