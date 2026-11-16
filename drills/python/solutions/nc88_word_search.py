def exist(board, word):
    if not word:  # @1
        return True  # @1
    if not board:  # @2
        return False  # @2

    # Depth-first from every starting square, with the path so far held in a set
    # so a letter is never reused within one attempt. The set is per-path rather
    # than global -- a square rejected on one route must still be available on
    # another, which is the difference between backtracking and plain search.
    def walk(r, c, remaining, used):
        if not remaining:  # @3
            return True  # @3
        if (r, c) in used or not (0 <= r < len(board) and 0 <= c < len(board[0])):  # @4
            return False  # @4
        if board[r][c] != remaining[0]:  # @5
            return False  # @5
        if len(remaining) == 1:  # @6
            return True  # @6
        used = used | {(r, c)}  # @7
        return any(  # @8
            walk(r + dr, c + dc, remaining[1:], used)  # @8
            for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1))  # @9
        )

    return any(  # @10
        walk(r, c, word, set())  # @10
        for r in range(len(board))  # @11
        for c in range(len(board[0]))  # @11
    )
