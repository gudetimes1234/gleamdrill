def exist(board, word):
    if not word:
        return True
    if not board:
        return False

    # Depth-first from every starting square, with the path so far held in a set
    # so a letter is never reused within one attempt. The set is per-path rather
    # than global -- a square rejected on one route must still be available on
    # another, which is the difference between backtracking and plain search.
    def walk(r, c, remaining, used):
        if not remaining:
            return True
        if (r, c) in used or not (0 <= r < len(board) and 0 <= c < len(board[0])):
            return False
        if board[r][c] != remaining[0]:
            return False
        if len(remaining) == 1:
            return True
        used = used | {(r, c)}
        return any(
            walk(r + dr, c + dc, remaining[1:], used)
            for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1))
        )

    return any(
        walk(r, c, word, set())
        for r in range(len(board))
        for c in range(len(board[0]))
    )
