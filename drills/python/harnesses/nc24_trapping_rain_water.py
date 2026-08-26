try:
    (trap)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])", 6, trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
__case__("trap([4, 2, 0, 3, 2, 5])", 9, trap([4, 2, 0, 3, 2, 5]))
__case__("trap([])", 0, trap([]))
__case__("trap([3])", 0, trap([3]))
__case__("trap([2, 0, 2])", 2, trap([2, 0, 2]))
__case__("trap([5, 4, 3, 2, 1])", 0, trap([5, 4, 3, 2, 1]))
