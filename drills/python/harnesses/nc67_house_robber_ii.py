try:
    (rob)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("rob([2, 3, 2])", 3, rob([2, 3, 2]))
__case__("rob([1, 2, 3, 1])", 4, rob([1, 2, 3, 1]))
__case__("rob([1, 2, 3])", 3, rob([1, 2, 3]))
__case__("rob([1])", 1, rob([1]))
__case__("rob([])", 0, rob([]))
__case__("rob([1, 2])", 2, rob([1, 2]))
