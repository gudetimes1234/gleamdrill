def findWords(board, words):
    if not board or not board[0]:
        return []

    # Word Search, once per word. Correct, and it redoes the search for every
    # shared prefix: a hundred words beginning "ab" each re-walk that "ab" from
    # every square. That repetition is exactly what the trie removes.
    def exists(word):
        def walk(r, c, at, used):
            if not (0 <= r < len(board) and 0 <= c < len(board[0])):
                return False
            if (r, c) in used or board[r][c] != word[at]:
                return False
            if at == len(word) - 1:
                return True
            used = used | {(r, c)}
            return any(
                walk(r + dr, c + dc, at + 1, used)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1))
            )

        return bool(word) and any(
            walk(r, c, 0, set())
            for r in range(len(board))
            for c in range(len(board[0]))
        )

    return [word for word in words if exists(word)]
