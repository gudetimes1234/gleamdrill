try:
    (solve)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __shown__(rows):
    return ["".join(row) for row in solve([list(row) for row in rows])]

__case__("solve(the classic 4x4)", ["XXXX", "XXXX", "XXXX", "XOXX"], __shown__(["XXXX", "XOOX", "XXOX", "XOXX"]))
__case__("solve([['X']])", ["X"], __shown__(["X"]))
__case__("solve([['O']]) -- on the border, so it survives", ["O"], __shown__(["O"]))
__case__("solve([])", [], __shown__([]))
__case__("solve(a region reaching the border)", ["XOX", "XOX", "XXX"], __shown__(["XOX", "XOX", "XXX"]))
