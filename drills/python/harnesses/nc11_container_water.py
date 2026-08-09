try:
    (maxArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", 49, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
__case__("maxArea([1, 1])", 1, maxArea([1, 1]))
