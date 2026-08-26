try:
    (maxCoins)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxCoins([3, 1, 5, 8])", 167, maxCoins([3, 1, 5, 8]))
__case__("maxCoins([1, 5])", 10, maxCoins([1, 5]))
__case__("maxCoins([])", 0, maxCoins([]))
__case__("maxCoins([5])", 5, maxCoins([5]))
__case__("maxCoins([1, 2, 3, 4])", 40, maxCoins([1, 2, 3, 4]))
