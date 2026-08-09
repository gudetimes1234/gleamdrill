try:
    (search)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("search([4, 5, 6, 7, 0, 1, 2], 0)", 4, search([4, 5, 6, 7, 0, 1, 2], 0))
__case__("search([4, 5, 6, 7, 0, 1, 2], 3)", -1, search([4, 5, 6, 7, 0, 1, 2], 3))
__case__("search([1], 1)", 0, search([1], 1))
__case__("search([4, 5, 6, 7, 0, 1, 2], 6)", 2, search([4, 5, 6, 7, 0, 1, 2], 6))
