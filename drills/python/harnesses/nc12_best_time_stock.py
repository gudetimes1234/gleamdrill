try:
    (maxProfit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProfit([7, 1, 5, 3, 6, 4])", 5, maxProfit([7, 1, 5, 3, 6, 4]))
__case__("maxProfit([7, 6, 4, 3, 1])", 0, maxProfit([7, 6, 4, 3, 1]))
__case__("maxProfit([])", 0, maxProfit([]))
