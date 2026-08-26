try:
    (missingNumber)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("missingNumber([3, 0, 1])", 2, missingNumber([3, 0, 1]))
__case__("missingNumber([0, 1])", 2, missingNumber([0, 1]))
__case__("missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])", 8, missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))
__case__("missingNumber([0])", 1, missingNumber([0]))
__case__("missingNumber([1])", 0, missingNumber([1]))
__case__("missingNumber([])", 0, missingNumber([]))
