from collections import Counter


def exist(board, word):
    if not word:
        return True
    if not board:
        return False

    letters = Counter(cell for row in board for cell in row)
    needed = Counter(word)

    # Two cheap checks before any searching. If the board does not hold enough
    # copies of some letter, no search can succeed. And searching from whichever
    # end of the word is rarer on the board starts from fewer squares -- the
    # branching factor at the root is what dominates.
    if any(letters[letter] < count for letter, count in needed.items()):
        return False
    if letters[word[0]] > letters[word[-1]]:
        word = word[::-1]

    def walk(r, c, remaining, used):
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
