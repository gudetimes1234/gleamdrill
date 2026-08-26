try:
    (singleNumber)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("singleNumber([2, 2, 1])", 1, singleNumber([2, 2, 1]))
__case__("singleNumber([4, 1, 2, 1, 2])", 4, singleNumber([4, 1, 2, 1, 2]))
__case__("singleNumber([1])", 1, singleNumber([1]))
__case__("singleNumber([-1, -1, -3])", -3, singleNumber([-1, -1, -3]))
__case__("singleNumber([0, 1, 1])", 0, singleNumber([0, 1, 1]))
