try:
    (search)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("search([-1, 0, 3, 5, 9, 12], 9)", 4, search([-1, 0, 3, 5, 9, 12], 9))
__case__("search([-1, 0, 3, 5, 9, 12], 2)", -1, search([-1, 0, 3, 5, 9, 12], 2))
__case__("search([5], 5)", 0, search([5], 5))
__case__("search([], 1)", -1, search([], 1))
