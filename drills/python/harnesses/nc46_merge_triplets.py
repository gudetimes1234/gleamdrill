try:
    (mergeTriplets)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("mergeTriplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5])", True, mergeTriplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]))
__case__("mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5])", False, mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5]))
__case__("mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5])", True, mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]))
__case__("mergeTriplets([[1, 1, 1]], [1, 1, 1])", True, mergeTriplets([[1, 1, 1]], [1, 1, 1]))
__case__("mergeTriplets([], [1, 1, 1])", False, mergeTriplets([], [1, 1, 1]))
__case__("mergeTriplets([[1, 2, 3]], [3, 2, 1])", False, mergeTriplets([[1, 2, 3]], [3, 2, 1]))
