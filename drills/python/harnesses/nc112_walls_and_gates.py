try:
    (wallsAndGates)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__inf__ = 2147483647

__case__("wallsAndGates(the classic 4x4)", [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]], wallsAndGates([[__inf__, -1, 0, __inf__], [__inf__, __inf__, __inf__, -1], [__inf__, -1, __inf__, -1], [0, -1, __inf__, __inf__]]))
__case__("wallsAndGates([[0]])", [[0]], wallsAndGates([[0]]))
__case__("wallsAndGates([[-1]])", [[-1]], wallsAndGates([[-1]]))
__case__("wallsAndGates([])", [], wallsAndGates([]))
__case__("wallsAndGates(no gate at all)", [[__inf__, __inf__]], wallsAndGates([[__inf__, __inf__]]))
