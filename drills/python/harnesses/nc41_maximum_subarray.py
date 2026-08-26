try:
    (maxSubArray)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", 6, maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
__case__("maxSubArray([1])", 1, maxSubArray([1]))
__case__("maxSubArray([5, 4, -1, 7, 8])", 23, maxSubArray([5, 4, -1, 7, 8]))
__case__("maxSubArray([-1])", -1, maxSubArray([-1]))
__case__("maxSubArray([-2, -1])", -1, maxSubArray([-2, -1]))
__case__("maxSubArray([])", 0, maxSubArray([]))
