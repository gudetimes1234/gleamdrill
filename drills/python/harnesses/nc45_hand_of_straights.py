try:
    (isNStraightHand)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)", True, isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3))
__case__("isNStraightHand([1, 2, 3, 4, 5], 4)", False, isNStraightHand([1, 2, 3, 4, 5], 4))
__case__("isNStraightHand([1, 2, 3, 4, 5, 6], 2)", True, isNStraightHand([1, 2, 3, 4, 5, 6], 2))
__case__("isNStraightHand([], 1)", True, isNStraightHand([], 1))
__case__("isNStraightHand([1, 1, 2, 2, 3, 3], 3)", True, isNStraightHand([1, 1, 2, 2, 3, 3], 3))
__case__("isNStraightHand([8, 10, 12], 3)", False, isNStraightHand([8, 10, 12], 3))
