try:
    (kClosest)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Any order is acceptable, so every case compares sorted.
def __sorted__(points, k):
    return sorted([list(p) for p in kClosest(points, k)])

__case__("kClosest([[1, 3], [-2, 2]], 1)", [[-2, 2]], __sorted__([[1, 3], [-2, 2]], 1))
__case__("kClosest([[3, 3], [5, -1], [-2, 4]], 2)", [[-2, 4], [3, 3]], __sorted__([[3, 3], [5, -1], [-2, 4]], 2))
__case__("kClosest([], 0)", [], __sorted__([], 0))
__case__("kClosest([[0, 0]], 1)", [[0, 0]], __sorted__([[0, 0]], 1))
__case__("kClosest([[1, 1], [2, 2], [3, 3]], 2)", [[1, 1], [2, 2]], __sorted__([[1, 1], [2, 2], [3, 3]], 2))
