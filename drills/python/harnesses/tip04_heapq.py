try:
    (kSmallest, kLargest)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("kSmallest([5, 1, 4, 2], 2)", [1, 2], kSmallest([5, 1, 4, 2], 2))
__case__("kLargest([5, 1, 4, 2], 2)", [5, 4], kLargest([5, 1, 4, 2], 2))
__case__("kSmallest([3], 5)", [3], kSmallest([3], 5))
