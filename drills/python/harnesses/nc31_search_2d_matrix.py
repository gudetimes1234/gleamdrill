try:
    (searchMatrix)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__matrix__ = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

__case__("searchMatrix(matrix, 3)", True, searchMatrix(__matrix__, 3))
__case__("searchMatrix(matrix, 13)", False, searchMatrix(__matrix__, 13))
__case__("searchMatrix(matrix, 60)", True, searchMatrix(__matrix__, 60))
__case__("searchMatrix([[1]], 1)", True, searchMatrix([[1]], 1))
__case__("searchMatrix([], 1)", False, searchMatrix([], 1))
__case__("searchMatrix([[1], [3], [5]], 5)", True, searchMatrix([[1], [3], [5]], 5))
