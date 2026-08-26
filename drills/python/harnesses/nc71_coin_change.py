try:
    (coinChange)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("coinChange([1, 2, 5], 11)", 3, coinChange([1, 2, 5], 11))
__case__("coinChange([2], 3)", -1, coinChange([2], 3))
__case__("coinChange([1], 0)", 0, coinChange([1], 0))
__case__("coinChange([], 5)", -1, coinChange([], 5))
__case__("coinChange([1, 3, 4], 6)", 2, coinChange([1, 3, 4], 6))
__case__("coinChange([2, 5, 10, 1], 27)", 4, coinChange([2, 5, 10, 1], 27))
