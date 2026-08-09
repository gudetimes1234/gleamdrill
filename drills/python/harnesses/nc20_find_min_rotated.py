try:
    (findMin)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findMin([3, 4, 5, 1, 2])", 1, findMin([3, 4, 5, 1, 2]))
__case__("findMin([4, 5, 6, 7, 0, 1, 2])", 0, findMin([4, 5, 6, 7, 0, 1, 2]))
__case__("findMin([11, 13, 15, 17])", 11, findMin([11, 13, 15, 17]))
__case__("findMin([2, 1])", 1, findMin([2, 1]))
