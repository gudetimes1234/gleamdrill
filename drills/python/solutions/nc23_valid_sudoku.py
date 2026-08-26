def isValidSudoku(board):
    seen = set()
    for r, row in enumerate(board):
        for c, value in enumerate(row):
            if value == ".":
                continue
            keys = (
                (value, "row", r),
                (value, "col", c),
                (value, "box", r // 3, c // 3),
            )
            if any(key in seen for key in keys):
                return False
            seen.update(keys)
    return True
