try:
    (isValidSudoku)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Nine row strings rather than a 9x9 literal: the board stays readable, and a
# single changed cell is what each invalid case is.
__rows__ = [
    "53..7....",
    "6..195...",
    ".98....6.",
    "8...6...3",
    "4..8.3..1",
    "7...2...6",
    ".6....28.",
    "...419..5",
    "....8..79",
]

def __board__():
    return [list(row) for row in __rows__]

def __with_cell__(r, c, value):
    board = __board__()
    board[r][c] = value
    return board

__case__("isValidSudoku(valid board)", True, isValidSudoku(__board__()))
__case__("isValidSudoku(5 twice in row 0)", False, isValidSudoku(__with_cell__(0, 2, "5")))
__case__("isValidSudoku(5 twice in column 0, different boxes)", False, isValidSudoku(__with_cell__(3, 0, "5")))
__case__("isValidSudoku(3 twice in the top-left box only)", False, isValidSudoku(__with_cell__(2, 0, "3")))
__case__("isValidSudoku(empty board)", True, isValidSudoku([["."] * 9 for _ in range(9)]))
