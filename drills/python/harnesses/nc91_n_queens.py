try:
    (solveNQueens)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __sorted__(n):
    return sorted("|".join(board) for board in solveNQueens(n))

__case__("solveNQueens(4)", ["..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."], __sorted__(4))
__case__("solveNQueens(1)", ["Q"], __sorted__(1))
__case__("solveNQueens(2)", [], __sorted__(2))
__case__("solveNQueens(3)", [], __sorted__(3))
__case__("solveNQueens(6) count", 4, len(solveNQueens(6)))
