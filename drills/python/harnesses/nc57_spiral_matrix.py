try:
    (spiralOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", [1, 2, 3, 6, 9, 8, 7, 4, 5], spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
__case__("spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])", [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7], spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))
__case__("spiralOrder([[1]])", [1], spiralOrder([[1]]))
__case__("spiralOrder([])", [], spiralOrder([]))
__case__("spiralOrder([[1, 2, 3]])", [1, 2, 3], spiralOrder([[1, 2, 3]]))
__case__("spiralOrder([[1], [2], [3]])", [1, 2, 3], spiralOrder([[1], [2], [3]]))
