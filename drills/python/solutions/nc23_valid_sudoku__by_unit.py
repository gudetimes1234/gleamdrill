def isValidSudoku(board):
    return all(noDuplicates(unit) for unit in units(board))


def units(board):
    rows = [list(row) for row in board]
    columns = [list(column) for column in zip(*board)]
    boxes = [
        [board[r][c] for r in range(br, br + 3) for c in range(bc, bc + 3)]
        for br in range(0, 9, 3)
        for bc in range(0, 9, 3)
    ]
    return rows + columns + boxes


def noDuplicates(unit):
    filled = [value for value in unit if value != "."]
    return len(filled) == len(set(filled))
