try:
    (exist)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__board__ = [list(row) for row in ["ABCE", "SFCS", "ADEE"]]

__case__("exist(board, 'ABCCED')", True, exist(__board__, "ABCCED"))
__case__("exist(board, 'SEE')", True, exist(__board__, "SEE"))
__case__("exist(board, 'ABCB')", False, exist(__board__, "ABCB"))
__case__("exist(board, '')", True, exist(__board__, ""))
__case__("exist(board, 'Z')", False, exist(__board__, "Z"))
__case__("exist([], 'A')", False, exist([], "A"))
