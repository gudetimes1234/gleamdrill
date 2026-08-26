try:
    (rob)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("rob([1, 2, 3, 1])", 4, rob([1, 2, 3, 1]))
__case__("rob([2, 7, 9, 3, 1])", 12, rob([2, 7, 9, 3, 1]))
__case__("rob([5])", 5, rob([5]))
__case__("rob([])", 0, rob([]))
__case__("rob([2, 1, 1, 2])", 4, rob([2, 1, 1, 2]))
__case__("rob([1, 2])", 2, rob([1, 2]))
