try:
    (insert)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("insert([[1, 3], [6, 9]], [2, 5])", [[1, 5], [6, 9]], insert([[1, 3], [6, 9]], [2, 5]))
__case__("insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])", [[1, 2], [3, 10], [12, 16]], insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]))
__case__("insert([], [5, 7])", [[5, 7]], insert([], [5, 7]))
__case__("insert([[1, 5]], [2, 3])", [[1, 5]], insert([[1, 5]], [2, 3]))
__case__("insert([[1, 5]], [6, 8])", [[1, 5], [6, 8]], insert([[1, 5]], [6, 8]))
__case__("insert([[3, 5]], [1, 2])", [[1, 2], [3, 5]], insert([[3, 5]], [1, 2]))
