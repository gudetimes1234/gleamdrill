try:
    (getSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("getSum(1, 2)", 3, getSum(1, 2))
__case__("getSum(2, 3)", 5, getSum(2, 3))
__case__("getSum(-1, 1)", 0, getSum(-1, 1))
__case__("getSum(-2, -3)", -5, getSum(-2, -3))
__case__("getSum(0, 0)", 0, getSum(0, 0))
__case__("getSum(-1, -1)", -2, getSum(-1, -1))
__case__("getSum(5, -3)", 2, getSum(5, -3))
