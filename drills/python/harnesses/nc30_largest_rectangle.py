try:
    (largestRectangleArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("largestRectangleArea([2, 1, 5, 6, 2, 3])", 10, largestRectangleArea([2, 1, 5, 6, 2, 3]))
__case__("largestRectangleArea([2, 4])", 4, largestRectangleArea([2, 4]))
__case__("largestRectangleArea([])", 0, largestRectangleArea([]))
__case__("largestRectangleArea([1, 1, 1])", 3, largestRectangleArea([1, 1, 1]))
__case__("largestRectangleArea([5])", 5, largestRectangleArea([5]))
__case__("largestRectangleArea([4, 2, 0, 3, 2, 5])", 6, largestRectangleArea([4, 2, 0, 3, 2, 5]))
