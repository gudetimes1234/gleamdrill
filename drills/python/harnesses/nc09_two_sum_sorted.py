try:
    (twoSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("twoSum([2, 7, 11, 15], 9)", [1, 2], twoSum([2, 7, 11, 15], 9))
__case__("twoSum([2, 3, 4], 6)", [1, 3], twoSum([2, 3, 4], 6))
__case__("twoSum([-1, 0], -1)", [1, 2], twoSum([-1, 0], -1))
__case__("twoSum([1, 2, 3], 100)", [], twoSum([1, 2, 3], 100))
