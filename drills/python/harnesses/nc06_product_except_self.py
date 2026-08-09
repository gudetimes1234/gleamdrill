try:
    (productExceptSelf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("productExceptSelf([1, 2, 3, 4])", [24, 12, 8, 6], productExceptSelf([1, 2, 3, 4]))
__case__("productExceptSelf([-1, 1, 0, -3, 3])", [0, 0, 9, 0, 0], productExceptSelf([-1, 1, 0, -3, 3]))
__case__("productExceptSelf([2, 3])", [3, 2], productExceptSelf([2, 3]))
