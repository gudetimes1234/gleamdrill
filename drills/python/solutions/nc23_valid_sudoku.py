def isValidSudoku(board):
    seen = set()  # @1
    for r, row in enumerate(board):  # @2
        for c, value in enumerate(row):  # @3
            if value == ".":  # @4
                continue  # @4
            keys = (  # @5
                (value, "row", r),  # @5
                (value, "col", c),  # @5
                (value, "box", r // 3, c // 3),  # @6
            )  # @6
            if any(key in seen for key in keys):  # @7
                return False  # @7
            seen.update(keys)  # @8
    return True  # @9
