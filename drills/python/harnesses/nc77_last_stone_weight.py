try:
    (lastStoneWeight)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("lastStoneWeight([2, 7, 4, 1, 8, 1])", 1, lastStoneWeight([2, 7, 4, 1, 8, 1]))
__case__("lastStoneWeight([1])", 1, lastStoneWeight([1]))
__case__("lastStoneWeight([])", 0, lastStoneWeight([]))
__case__("lastStoneWeight([2, 2])", 0, lastStoneWeight([2, 2]))
__case__("lastStoneWeight([3, 7, 2])", 2, lastStoneWeight([3, 7, 2]))
__case__("lastStoneWeight([10, 4, 2, 10])", 2, lastStoneWeight([10, 4, 2, 10]))
