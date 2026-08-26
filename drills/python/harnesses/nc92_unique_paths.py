try:
    (uniquePaths)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("uniquePaths(3, 7)", 28, uniquePaths(3, 7))
__case__("uniquePaths(3, 2)", 3, uniquePaths(3, 2))
__case__("uniquePaths(7, 3)", 28, uniquePaths(7, 3))
__case__("uniquePaths(1, 5)", 1, uniquePaths(1, 5))
__case__("uniquePaths(0, 5)", 0, uniquePaths(0, 5))
__case__("uniquePaths(10, 10)", 48620, uniquePaths(10, 10))
