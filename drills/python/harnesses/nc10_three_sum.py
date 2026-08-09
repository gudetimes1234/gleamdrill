try:
    (threeSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("threeSum([-1, 0, 1, 2, -1, -4])", [[-1, -1, 2], [-1, 0, 1]], threeSum([-1, 0, 1, 2, -1, -4]))
__case__("threeSum([0, 1, 1])", [], threeSum([0, 1, 1]))
__case__("threeSum([0, 0, 0])", [[0, 0, 0]], threeSum([0, 0, 0]))
