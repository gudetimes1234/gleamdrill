try:
    (longestIncreasingPath)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]])", 4, longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]))
__case__("longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]])", 4, longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]))
__case__("longestIncreasingPath([[1]])", 1, longestIncreasingPath([[1]]))
__case__("longestIncreasingPath([])", 0, longestIncreasingPath([]))
__case__("longestIncreasingPath([[1, 2], [3, 4]])", 3, longestIncreasingPath([[1, 2], [3, 4]]))
