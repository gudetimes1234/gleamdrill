try:
    (firstIndexOf, dotProduct)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("firstIndexOf([9, 8, 7], 8)", 1, firstIndexOf([9, 8, 7], 8))
__case__("firstIndexOf([9, 8, 7], 5)", -1, firstIndexOf([9, 8, 7], 5))
__case__("dotProduct([1, 2, 3], [4, 5, 6])", 32, dotProduct([1, 2, 3], [4, 5, 6]))
