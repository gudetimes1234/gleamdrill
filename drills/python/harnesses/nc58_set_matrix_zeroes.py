try:
    (setZeroes)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]])", [[1, 0, 1], [0, 0, 0], [1, 0, 1]], setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]]))
__case__("setZeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])", [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]], setZeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]))
__case__("setZeroes([[1]])", [[1]], setZeroes([[1]]))
__case__("setZeroes([[0]])", [[0]], setZeroes([[0]]))
__case__("setZeroes([])", [], setZeroes([]))
__case__("setZeroes([[1, 2], [3, 4]])", [[1, 2], [3, 4]], setZeroes([[1, 2], [3, 4]]))
