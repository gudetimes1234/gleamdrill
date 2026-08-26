try:
    (maxProfit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProfit([1, 2, 3, 0, 2])", 3, maxProfit([1, 2, 3, 0, 2]))
__case__("maxProfit([1])", 0, maxProfit([1]))
__case__("maxProfit([])", 0, maxProfit([]))
__case__("maxProfit([2, 1])", 0, maxProfit([2, 1]))
__case__("maxProfit([1, 2, 3, 4, 5])", 4, maxProfit([1, 2, 3, 4, 5]))
__case__("maxProfit([6, 1, 3, 2, 4, 7])", 6, maxProfit([6, 1, 3, 2, 4, 7]))
