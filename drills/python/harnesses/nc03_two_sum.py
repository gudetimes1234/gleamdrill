try:
    (twoSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("twoSum([2, 7, 11, 15], 9)", [0, 1], twoSum([2, 7, 11, 15], 9))
__case__("twoSum([3, 2, 4], 6)", [1, 2], twoSum([3, 2, 4], 6))
__case__("twoSum([3, 3], 6)", [0, 1], twoSum([3, 3], 6))
__case__("twoSum([1, 2], 7)", [], twoSum([1, 2], 7))
