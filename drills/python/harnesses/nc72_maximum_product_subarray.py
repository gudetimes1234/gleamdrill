try:
    (maxProduct)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProduct([2, 3, -2, 4])", 6, maxProduct([2, 3, -2, 4]))
__case__("maxProduct([-2, 0, -1])", 0, maxProduct([-2, 0, -1]))
__case__("maxProduct([-2, 3, -4])", 24, maxProduct([-2, 3, -4]))
__case__("maxProduct([0])", 0, maxProduct([0]))
__case__("maxProduct([-2])", -2, maxProduct([-2]))
__case__("maxProduct([2, -5, -2, -4, 3])", 24, maxProduct([2, -5, -2, -4, 3]))
__case__("maxProduct([])", 0, maxProduct([]))
