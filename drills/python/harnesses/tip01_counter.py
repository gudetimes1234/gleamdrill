try:
    (topTwo, countOf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topTwo([1, 1, 1, 2, 2, 3])", [(1, 3), (2, 2)], topTwo([1, 1, 1, 2, 2, 3]))
__case__("countOf([1, 1, 2], 1)", 2, countOf([1, 1, 2], 1))
__case__("countOf([1, 1, 2], 9)", 0, countOf([1, 1, 2], 9))
