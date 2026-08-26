try:
    (minEatingSpeed)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minEatingSpeed([3, 6, 7, 11], 8)", 4, minEatingSpeed([3, 6, 7, 11], 8))
__case__("minEatingSpeed([30, 11, 23, 4, 20], 5)", 30, minEatingSpeed([30, 11, 23, 4, 20], 5))
__case__("minEatingSpeed([30, 11, 23, 4, 20], 6)", 23, minEatingSpeed([30, 11, 23, 4, 20], 6))
__case__("minEatingSpeed([1], 1)", 1, minEatingSpeed([1], 1))
__case__("minEatingSpeed([4, 4, 4, 4], 4)", 4, minEatingSpeed([4, 4, 4, 4], 4))
__case__("minEatingSpeed([1, 1, 1, 10], 4)", 10, minEatingSpeed([1, 1, 1, 10], 4))
