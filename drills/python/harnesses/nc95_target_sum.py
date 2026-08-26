try:
    (findTargetSumWays)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findTargetSumWays([1, 1, 1, 1, 1], 3)", 5, findTargetSumWays([1, 1, 1, 1, 1], 3))
__case__("findTargetSumWays([1], 1)", 1, findTargetSumWays([1], 1))
__case__("findTargetSumWays([1], 2)", 0, findTargetSumWays([1], 2))
__case__("findTargetSumWays([0, 0, 0, 0, 0], 0)", 32, findTargetSumWays([0, 0, 0, 0, 0], 0))
__case__("findTargetSumWays([], 0)", 1, findTargetSumWays([], 0))
__case__("findTargetSumWays([1, 2, 3, 4, 5], 3)", 3, findTargetSumWays([1, 2, 3, 4, 5], 3))
